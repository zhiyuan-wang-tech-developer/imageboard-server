const { Router } = require('express')
const { toJWT, toData } = require('./jwt')
const bcrypt = require('bcrypt')        // Import bcrypt
const authenticate = require('./middleware')
const userModel = require('../user/model')    // Import user model

// Instantiate a new /login router
const router = new Router()

// POST /login request for user login
router.post('/login', (request, response) => {
    const email = request.body.email
    const password = request.body.password

    if (!(email && password)) {
        // in case email or password is undefined or null
        response
            .status(400)
            .send(
                {
                    message: 'No email or password in request body'
                }
            )
    }
    else if (!(email.length && password.length)) {
        // When email or password is empty, return 400 Bad Request.
        response
            .status(400)
            .send(
                {
                    message: 'Please supply a valid email and password'
                }
            )
    }
    else {
        // normally check the password and find the correct user in the database
        // 1. find user based on email address
        userModel
            .findOne(
                {
                    where: {
                        email: email
                    }
                }
            )
            .then(user => {
                if (!user) {
                    // if user is null
                    response
                        .status(400)
                        .send(
                            {
                                message: 'User with that email does not exist'
                            }
                        )
                }
                // 2. use bcrypt.compareSync to check the plaintext password against the stored hash password (user.password)
                else if (bcrypt.compareSync(password, user.password)) {
                    // 3. if the password is correct, return a JWT with the userId (user.id)
                    response
                        .send(
                            {
                                jwt: toJWT({ userId: user.id })
                            }
                        )
                }
                else {
                    // password is incorrect, return status code 400 Bad Request
                    response
                        .status(400)
                        .send(
                            {
                                message: 'Password was incorrect'
                            }
                        )
                }
            })
            .catch(error => {
                console.error(error)
                // return status code 500 Internal Server Error
                response
                    .status(500)
                    .send(
                        {
                            message: 'Server went wrong'
                        }
                    )
            })
    }
})

// GET /secret-endpoint
// Register authenticate as middleware handler
router.get('/secret-endpoint', authenticate, (request, response) => {
    response
        .send(
            {
                message: `Thanks for visiting the secret endpoint ${request.user.email}.`
            }
        )
})

module.exports = router