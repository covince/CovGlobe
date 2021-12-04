const express = require('express')
const middleware = require('covince-backend/middleware')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 's-max-age=300')
  next()
})

app.use('/api', middleware)

app.use(function errorHandler (err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  res.sendStatus(500) // silent error message
})

module.exports = app
