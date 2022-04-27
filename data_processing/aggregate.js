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
      country = covv_location.split('/')[1].trim(),
      covv_lineage: lineage
      // covsurver_prot_mutations,
      // mutations = covsurver_prot_mutations.slice(1, -1).split(',').sort().join('|')
    } = JSON.parse(line)
    if (!lineage || lineage === 'Unassigned' || !dateRegex.test(date)) {
      continue
    }
    const fuzzyDate = fuzzDate(date)
    // if (fuzzyDate < '2020-03-01') {
    //   continue
    // }
    const key = [
      country,
      fuzzyDate,
      // lineage,
      pango.expandLineage(lineage) + '.'
      // mutations
    ].join(',')
    if (key in counts) counts[key] += 1
    else counts[key] = 1

    if (done % 100000 === 0) {
      console.log(`... ${done.toLocaleString()} done`)
    }
  }

  console.log('Writing output ...')
  fs.writeFileSync('./aggregated.csv', '')
  const keys = Object.keys(counts)
  const chunkSize = 100000
  let i = 0
  while (i < keys.length) {
    let chunk =
      keys.slice(i, i + chunkSize)
        .map(k => `${k},${counts[k]}`)
        .join('\n')
    fs.appendFileSync('./aggregated.csv', chunk + '\n')
    i += chunkSize
    chunk = null
  }
}

aggregate()
