'use strict'
const middlewares = require('../middlewares')
const models = require('../models')
const User = models.User

console.log(middlewares)

module.exports = router => {
  router
    .get('/', middlewares.login, (req, res, next) => {
      const username = req.headers.authorization.split(',')[0].split('"')[1]
      User.findOne({
        attributes: {
            exclude: ['password']
        },
        where: {
          username
        }
      })
        .then(token => {
          res.send(token)
        })
        .catch(error => {
          res.status(500).send(error)
        })
    })

    .get('/basic', middlewares.basicLogin, (req, res, next) => {
      const username = new Buffer(req.headers.authorization.split(' ')[1], 'base64').toString('utf8').split(':')[0]
      User.findOne({
        attributes: {
          exclude: ['password']
        },
        where: {
          username
        }
      })
        .then(user => {
          res.send(user)
        })
        .catch(error => {
          res.status(500).send(error)
        })
    })
}
