'use strict'
const passport = require('passport')
const BearerStrategy = require('passport-http-bearer').Strategy
const models = require('../models')
const User = models.User

/**
 * This is a passport middleware to authenticate with a token using http-bearer strategy.
 * You can just use it as a router's or a route's middleware.
 * @example
 * const authenticate = require('./authenticate')
 * ...
 * router.get('/', authenticate, (req, res, next) => {
 *    res.send({ message: 'this route is now secured' })
 * })
 *
 * The query has to contain an authorization field:
 *  "Authorization: Bearer <token>"
 */
passport.use(new BearerStrategy((token, cb) => {
    User.findOne({
        where: { token }
    })
        .then(user => {
            if(user){
                return cb(null, user)
            } else {
                return cb(null, false)
            }
        })
        .catch(error => {
            return cb(error)
        })
}))

const authenticate = passport.authenticate('bearer', { session: false })

module.exports = authenticate
