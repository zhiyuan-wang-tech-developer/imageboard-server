const userModel = require('../user/model')
const { toData } = require('./jwt')

/**
 * @summary middleware handler to authenticate request
 * @param {object} request - from previous middleware 
 * @param {object} response - from previous middleware
 * @param {function} next - next middleware handler 
 */
function authenticate(request, response, next) {
    const auth = request.headers.authorization && request.headers.authorization.split(' ')
    /**
     * The authorization header pattern:
     * authorization: <type> <credentials>
     * auth[0] == <type>            Note: here is 'Bearer'
     * auth[1] == <credentials>     Note: here is { userId } 
     */
    if (auth && auth[0] === 'Bearer' && auth[1]) {
        try {
            const data = toData(auth[1])    // auth[1] is an encoded object { userId }
            userModel
                .findByPk(data.userId)
                .then(user => {
                    if (!user) {
                        // in case user is undefined or null
                        return next('User does not exist.')   // call built-in error handler
                    }
                    request.user = user
                    next()      // trigger next middleware handler
                })
                .catch(next)    // call built-in error handler
        }
        catch (error) {
            response
                .status(400)     // return status code 400 bad request 
                .send(
                    {
                        message: `Error ${error.name}: ${error.message}`
                    }
                )
        }
    }
    else {
        response
            .status(401)        // return status code 401 unauthorized or unauthenticated
            .send(
                {
                    message: 'Please supply some valid credentials.'
                }
            )
    }
}

module.exports = authenticate