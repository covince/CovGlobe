const _aliases = require('./aliases.json')

const aliases = Object.fromEntries(
  Object.entries(_aliases).filter(([_, v]) => v.length && !Array.isArray(v))
)

const expandLineage = lineage => {
  const parts = lineage.split('.')
  const [root, ...rest] = parts
  return aliases[root] ? [aliases[root], ...rest].join('.') : lineage
}

module.exports = {
  expandLineage,
  aliases
}
