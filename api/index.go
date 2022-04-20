package covglobe

import (
	"bufio"
	"embed"
	"log"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/covince/covince-backend-v2/api"
	"github.com/covince/covince-backend-v2/covince"
)

//go:embed "aggregated.csv"
var f embed.FS

func iterator(agg func(r *covince.Record), i int) {
	csvfile, err := f.Open("aggregated.csv")
	if err != nil {
		log.Fatalln("Couldn't open the csv file", err)
	}

	c := make(chan covince.Record, 500)
	done := make(chan bool)
	go func() {
		for r := range c {
			agg(&r)
		}
		done <- true
	}()

	db := covince.CreateDatabase()

	scanner := bufio.NewScanner(csvfile)
	firstLine := true
	for scanner.Scan() {
		if firstLine {
			firstLine = false
			continue
		}
		row := strings.Split(scanner.Text(), ",")

		count, _ := strconv.Atoi(row[3])

		c <- covince.Record{
			Area:       db.IndexValue(row[0]),
			Date:       db.IndexValue(row[1]),
			PangoClade: db.IndexValue(row[2]),
			// Lineage:    db.IndexValue(row[2]),
			Count: count,
		}
	}
	close(c)
	<-done
}

func Handler(w http.ResponseWriter, r *http.Request) {
	//	TODO: update example to read opts from JSON
	opts := api.Opts{
		PathPrefix:  "/api",
		MaxLineages: 16,
		// Genes:            db.Genes,
		// MaxSearchResults: 32,
		LastModified: time.Now().UnixMilli(),
	}

	handler := api.CovinceAPI(opts, iterator)

	w.Header().Set("s-maxage", "300")

	handler(w, r)
}
