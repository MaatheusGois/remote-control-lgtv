/* eslint-disable no-path-concat */
const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')

const app = express()
const port = 6767

const {
  commandsRouter,
  powerRouter
} = require('./route')

// set up
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(helmet())

// route set up
app.use('/', commandsRouter)
app.use('/', powerRouter)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
