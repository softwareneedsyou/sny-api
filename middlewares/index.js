'use strict'
const authorization = require('./authorization')
const login = require('./login')

module.exports = {
  authorization,
  login: login.login,
  basicLogin: login.basicLogin,
}
