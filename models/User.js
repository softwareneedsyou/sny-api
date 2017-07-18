'use strict'
const Sequelize = require('sequelize')

module.exports = function(sequelize) {
    return sequelize.define('User', {
        firstname: {
            type: Sequelize.STRING,
            validate: {
              notEmpty: true,
              len: [3,20],
              isAlpha: true,
            },
        },
        lastname: {
            type: Sequelize.STRING,
            validate: {
              notEmpty: true,
              len: [3,20],
              isAlpha: true,
            },
        },
        username: {
            type: Sequelize.STRING,
            validate: {
              notEmpty: true,
              len: [3,20],
            },
        },
        email: {
            type: Sequelize.STRING,
            validate: {
              notEmpty: true,
              isEmail: true,
            },
        },
        password: {
            type: Sequelize.STRING,
            validate: {
              notEmpty: true,
            },
        },
        token: {
            type: Sequelize.STRING
        },
        admin: {
            type: Sequelize.BOOLEAN,
            validate: {
              notEmpty: true,
              isNumeric: true,
              isInt: true,
              min: 0,
              max : 1,
            },
        }
    })
}
