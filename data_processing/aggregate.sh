#! /bin/sh
set -e 

ALIAS_KEY='https://raw.githubusercontent.com/cov-lineages/pango-designation/master/pango_designation/alias_key.json'

wget -O aliases.json ${ALIAS_KEY}

node aggregate.js
