// Import express
const express = require('express')
// Import database
const database = require('./database')
const imageModel = require('./image/model')
const imageRouter = require('./image/router')

// Create a new express server
const app = express()

// Server port
const port = process.env.PORT || 4000

// Register the image router
app.use(imageRouter)

// Start the server
app.listen(port, () => {
    console.log(`RESTful API server is listening on port ${port}.`)
})