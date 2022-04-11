package main

import (
	"bufio"
	"compress/gzip"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/covince/covince-backend-v2/api"
	"github.com/covince/covince-backend-v2/covince"
	"github.com/covince/covince-backend-v2/perf"
)

func getCleanMuts(s string) []string {
	if s == "" {
		return []string{}
	}
	return strings.Split(s, "|")
}

const MUT_SEPARATOR = "_"

func addRecordToDatabase(db *covince.Database, row []string) {
	if len(row) != 5 {
		fmt.Println(row)
		return
	}

	count, _ := strconv.Atoi(row[4])

	db.Records = append(
		db.Records,
		covince.Record{
			Area:       db.IndexValue(row[0]),
			Date:       db.IndexValue(row[1]),
			PangoClade: db.IndexValue(row[2]),
			Mutations:  db.IndexMutations(getCleanMuts(row[3]), MUT_SEPARATOR),
			Count:      count,
		},
	)

	db.Count += 1
}

type Env struct {
	threads int
}

func parseEnv() *Env {
	var err error
	var env Env

	threads := 1
	threadsVar := os.Getenv("COVINCE_THREADS")
	if threadsVar != "" {
		threads, err = strconv.Atoi(os.Getenv("COVINCE_THREADS"))
		if err != nil {
			log.Fatalln("Could not parse threads variable", err)
		}
	}
	if threads == 1 {
		log.Println("multi-threading inactive")
	} else {
		log.Println("threads:", threads)
	}
	env.threads = threads

	return &env
}

func main() {
	start := time.Now()

	env := parseEnv()

	log.Println("Reading data ...")

	csvfile, err := os.Open("./data/aggregated.csv.gz")
	if err != nil {
		log.Fatalln("Couldn't open the csv file", err)
	}
	stat, err := csvfile.Stat()
	if err != nil {
		log.Fatalln("Couldn't stat the csv file", err)
	}
	unzipped, err := gzip.NewReader(csvfile)
	if err != nil {
		log.Fatalln("Couldn't establish gzip", err)
	}
	scanner := bufio.NewScanner(unzipped)
	buf := []byte{}
	// increase the buffer size to 2Mb
	scanner.Buffer(buf, 2048*1024)
	db := covince.CreateDatabase()

	i := 0
	for scanner.Scan() {
		i++
		row := strings.Split(scanner.Text(), ",")
		// fmt.Println(row)
		addRecordToDatabase(db, row)
	}

	if err := scanner.Err(); err != nil {
		log.Fatalf("%v", err)
	}

	log.Println(i, "iterated")
	log.Println(db.Count, "records")
	for k := range db.MutationLookup {
		delete(db.MutationLookup, k)
	}
	for k := range db.ValueLookup {
		delete(db.ValueLookup, k)
	}

	opts := api.Opts{
		Genes:            db.Genes,
		LastModified:     stat.ModTime().UnixMilli(),
		MaxLineages:      20,
		MaxSearchResults: 32,
		MultipleMuts:     true,
		MutSeparator:     MUT_SEPARATOR,
		PathPrefix:       "/api",
		Threads:          env.threads,
	}

	chunkSize := db.Count / opts.Threads
	foreach := func(agg func(r *covince.Record), i int) {
		if i == -1 {
			for _, r := range db.Records {
				agg(&r)
			}
		} else {
			min := i * chunkSize
			max := min + chunkSize
			for _, r := range db.Records[min:max] {
				agg(&r)
			}
		}
	}

	mux := http.NewServeMux()

	mux.HandleFunc("/api/aliases", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		http.ServeFile(w, r, "./aliases.json")
	})

	mux.HandleFunc("/", api.CovinceAPI(opts, foreach))

	perf.LogDuration("startup", start)
	perf.LogMemory()

	fmt.Println("Listening on port 4000")
	err = http.ListenAndServe(":4000", mux)
	log.Fatal(err)
}
