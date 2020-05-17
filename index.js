// Import express
const express = require('express')
// Import CORS
const cors = require('cors')
// Import body parser
const bodyParser = require('body-parser')
// Import database
const database = require('./database')
const imageModel = require('./image/model')
const imageRouter = require('./image/router')

// Create a new express server
const app = express()

// Enable Cross-Origin-Resource-Sharing
// cors() returns a middleware
// cors() needs to add the header 'Access-Control-Allow-Origin' first
const corsMiddleware = cors()
// The order matters: make sure you register cors() before all other middlewares and routes
// Add header field 'Access-Control-Allow-Origin: *'
app.use(corsMiddleware)

const parserMiddleware = bodyParser.json()
app.use(parserMiddleware)

// Server port
const port = process.env.PORT || 4000

// Register the image router
app.use(imageRouter)

// Start the server
app.listen(port, () => {
    console.log(`RESTful API server is listening on port ${port}.`)
})