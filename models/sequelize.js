'use strict'
const Sequelize = require('sequelize')
const path = require('path')
const config = require(path.dirname(require.main.filename) + '/config')

module.exports = {
    sequelize: new Sequelize(config.mysql.database, config.mysql.user, config.mysql.user_password, {
        host: config.mysql.dev_url,
        dialect: 'mysql'
    })
}
