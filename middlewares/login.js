'use strict'
const passport = require('passport')
const DigestStrategy = require('passport-http').DigestStrategy
const BasicStrategy = require('passport-http').BasicStrategy
const models = require('../models')
const User = models.User

/**
 *  This is a passport middleware to authenticate using an http-digest stategy.
 *  As any strategy given by passport, you can use it as a router or a route middleware.
 *  In this api's context tho, it is only used on the /login route in order to get a user's token back
 *  @example
 *  router.get('/', login, (req, res, next) => {
 *    res.send({
 *      message: 'You\'ve been successfully authenticated,
 *      token: <token>
 *    })
 *  })
 *
 *  The query has to send a correctly formed digest authentication header
 *  https://en.wikipedia.org/wiki/Digest_access_authentication#Example_with_explanation
 */
passport.use(new DigestStrategy({ qop: 'auth' }, (username, done) => {
    User.findOne({
        where: {
            username
        }
    }).then(user => {
        if(user){
            return done(null, user, user.password)
        } else {
            return done(null, false)
        }
    }).catch(error => {
        return done(error)
    })
},
    (params, done) => {
        done(null, true)
    })
)


passport.use(new BasicStrategy( (username, password, done) => {
  User.findOne({
      where: {
          username
      }
  }).then(user => {
      if(user){
        console.log("-" + user.password + "-" + password + "-")
        if(user.password == password){
          console.log("Mid : ")
          console.log(user.firstname)
          return done(null, user)
        } else {
          return done(null, false)
        }
      } else {
          return done(null, false)
      }
  }).catch(error => {
      return done(error)
  })
},
  (params, done) => {
      done(null, true)
  })
)

const login = passport.authenticate('digest', { session: false })
const basicLogin = passport.authenticate('basic', { session: false })

module.exports = {
  login,
  basicLogin,
}
