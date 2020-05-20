const express = require('express')
const bcrypt = require('bcrypt')        // Import bcrypt
// Import the Router class
const { Router } = express
// Import user model
const userModel = require('./model')

// Instantiate a new /user router
const router = new Router()

// POST /user request to create a user account for signup
router.post('/user', (request, response, next) => {
    if (!(request.body.email && request.body.password)) {
        // When email or password is undefined or null
        response
            .status(400)    // return status code 400 Bad Request
            .send(
                {
                    message: 'No email or password in request body'
                }
            )
    }
    else if (!(request.body.email.length && request.body.password.length)) {
        // When email or password is empty
        response
            .status(400)    // return status code 400 Bad Request.
            .send(
                {
                    message: 'Please supply a valid email and password'
                }
            )
    }
    else {
        // The user account in request.body should contain an email and a password.
        const userAccount = {
            email: request.body.email,
            password: bcrypt.hashSync(request.body.password, 10)  // Transform incoming password into an unreadable hash string
        }
        // Check if the email has existed in database.
        userModel
            .findOne(
                {
                    where: {
                        email: userAccount.email
                    }
                }
            )
            .then(user => {
                if (!user) {
                    // If user is null, user with the email does not exist in database.
                    userModel
                        .create(userAccount)
                        .then(user => {
                            // send back the new user account you created
                            response.send(user)
                        })
                }
                else {
                    // If user has existed in database
                    response
                        .status(400)
                        .send(
                            {
                                message: 'The user\'s email has existed.'
                            }
                        )
                }
            })
            .catch(next)
    }
})

module.exports = router