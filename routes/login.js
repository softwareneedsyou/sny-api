'use strict'
const middlewares = require('../middlewares')
const models = require('../models')
const User = models.User

module.exports = router => {
  router
    .get('/', middlewares.login, (req, res, next) => {
      const username = req.headers.authorization.split(',')[0].split('"')[1]
      User.findOne({
        attributes: ['token'],
        where: {
          username
        }
      })
        .then(token => {
          res.send(token)
        })
        .catch(error => {
          res.status(500).send({ error })
        })
    })
}
