require('dotenv').config()

require('./config/database')

const express = require('express')

const routes = require('./config/routes')

const bodyParser = require('body-parser')

const allowCors = require('./config/cors')

const app = express()

app.use(allowCors)

const server = require('http').Server(app)

app.use(bodyParser.json())

app.use(routes)

console.log("listening on port 3030")

server.listen(3030)