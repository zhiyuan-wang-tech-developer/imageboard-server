// Import express
const express = require('express')
// Import database
const database = require('./database')

// Create a new express server
const app = express()

// Server port
const port = process.env.PORT || 4000

// Start the server
app.listen(port, () => {
    console.log(`RESTful API server is listening on port ${port}.`)
})