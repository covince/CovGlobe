package covglobe

import (
	"embed"
	"io/fs"
	"log"
)

//go:embed "full_data_table.csv"
var f embed.FS

func CSV() fs.File {
	csv, err := f.Open("full_data_table.csv")
	if err != nil {
		log.Fatalln("Couldn't open the csv file", err)
	}
	return csv
}
