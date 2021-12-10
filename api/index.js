const express = require('express')
const createMiddleware = require('covince-backend/middleware')

const app = express()
app.set('query parser', 'simple')

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 's-maxage=300')
  next()
})

const knex = require('covince-backend/db')
app.use('/api', createMiddleware(knex))

app.use(function errorHandler (err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  res.sendStatus(500) // silent error message
})

module.exports = app
