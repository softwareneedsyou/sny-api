'use strict'
const Sequelize = require('sequelize')

module.exports = function(sequelize) {
    return sequelize.define('User', {
        firstname: {
            type: Sequelize.STRING,
        },
        lastname: {
            type: Sequelize.STRING,
        },
        username: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
        },
        password: {
            type: Sequelize.STRING,
        },
        token: {
            type: Sequelize.STRING
        },
        admin: {
            type: Sequelize.BOOLEAN,
        }
    })
}
