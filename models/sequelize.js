'use strict'
const Sequelize = require('sequelize')
const path = require('path')
const config = require(path.dirname(require.main.filename) + '/config')

var user, password, host

if(process.env.NODE_ENV == 'dev' || !process.env.NODE_ENV){
  user = config.mysql.root
  password = config.mysql.root_password
  if(process.env.NODE_MYSQL_DATABASE == 'docker'){
    host = config.mysql.docker_url
  } else {
    host = config.mysql.dev_url
  }
}

if(process.env.NODE_ENV == 'prod'){
  user = config.mysql.mysql_user
  password = config.mysql.user_password
  host = config.mysql.prod_url
}

module.exports = {
  sequelize: new Sequelize(config.mysql.database, user, password, {
    host: host,
    dialect: 'mysql'
  })
}
