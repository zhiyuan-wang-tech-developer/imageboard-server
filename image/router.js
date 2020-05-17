const express = require('express')
// Import the Router class
const { Router } = express
// Import image model
const imageModel = require('./model')

// Instantiate a new router
const router = new Router()

// GET request to read all images
router.get('/image', (request, response, next) => {
    imageModel
        .findAll()
        .then(images => response.send(images))
        .catch(next)
})

module.exports = router