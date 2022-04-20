const toDay = (date, ordinal) => {
  const day = date.getDay()
  const delta = ordinal - day
  date.setDate(date.getDate() + (delta >= 0 ? delta : delta + 7))
  return date
}

const fuzzDate = (dateStr) => {
  const date = new Date(dateStr)
  return toDay(date, 0).toISOString().split('T')[0]
}

module.exports = fuzzDate
