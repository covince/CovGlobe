const fs = require('fs')
const readline = require('readline')
const pango = require('./pango')
const fuzzDate = require('./dates')
// const zlib = require('zlib')

const dateRegex = /202.-[0-9][0-9]-[0-9][0-9]/

async function aggregate () {
  const file = fs.createReadStream('./provision.json')
  const rl = readline.createInterface({
    input: file,
    crlfDelay: Infinity
  })

  const counts = {}

  console.log('Aggregating samples ...')
  let done = 0

  for await (const line of rl) {
    done++
    const {
      covv_collection_date: date,
      covv_location,
      country = covv_location.split(' / ')[1],
      covv_lineage: lineage,
      covsurver_prot_mutations,
      mutations = covsurver_prot_mutations.slice(1, -1)
    } = JSON.parse(line)
    if (!lineage || lineage === 'None' || !dateRegex.test(date)) {
      continue
    }
    const fuzzyDate = fuzzDate(date)

    const key = [
      country,
      fuzzyDate,
      // lineage,
      pango.expandLineage(lineage) + '.',
      mutations
    ].join(',')
    if (key in counts) counts[key] += 1
    else counts[key] = 1

    if (done % 100000 === 0) {
      console.log(`... ${done.toLocaleString()} done`)
    }
  }

  console.log('Writing output ...')
  fs.writeFileSync('./aggregated.csv', '')
  const lines = Object.entries(counts).map(([key, count]) => `${key},${count}`)
  const chunkSize = 100000
  let i = 0
  while (i < lines.length) {
    const chunk = lines.slice(i, i + chunkSize).join('\n')
    fs.appendFileSync('./aggregated.csv', chunk + '\n')
    i += chunkSize
  }
}

aggregate()
