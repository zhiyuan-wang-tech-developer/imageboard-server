const jwt = require('jsonwebtoken')

// Private KEY or Secret KEY
const secretKey = process.env.JWT_SECRET || 'e9rp^&^*&@9sejg)DSUA)jpfds8394jdsfn,m'

/**
 * @summary Convert data to JSON Web Token string
 * @param {object} data - data object to be converted
 * @returns {string} JSON Web Token as a string
 */
function toJWT(data) {
    return jwt.sign(data, secretKey, { expiresIn: '2h' })
}

/**
 * @summary Decode JSON Web Token string to data
 * @param {string} token - JSON Web Token string to verify
 * @returns {string} decoded data in token
 */
function toData(token) {
    return jwt.verify(token, secretKey)
}

module.exports = { toJWT, toData }