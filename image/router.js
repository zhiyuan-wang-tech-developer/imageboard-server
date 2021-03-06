const express = require('express')
// Import the Router class
const { Router } = express
// Import image model
const imageModel = require('./model')
// Import authentication middleware
const authenticate = require('../auth/middleware')

// Instantiate a new /image router
const router = new Router()

// POST request to create a new image post in the database
router.post('/image', authenticate, (request, response, next) => {
    imageModel
        .create(request.body)
        .then(image => {
            // send back the new image post you created
            response.send(image)
        })
        .catch(next)
})

// GET request to read all images
router.get('/image', (request, response, next) => {
    imageModel
        .findAll()
        .then(images => response.send(images))
        .catch(next)
})

module.exports = router