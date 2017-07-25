'use strict'
const Sequelize = require('sequelize')

module.exports = function(sequelize) {
    return sequelize.define('User', {
        firstname: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [3,20],
                isAlpha: true,
            },
        },
        lastname: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [3,20],
                isAlpha: true,
            },
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [3,20],
            },
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                isEmail: true,
            },
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [6, 15],
            },
        },
        token: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        admin: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            validate: {
                notEmpty: true,
                isNumeric: true,
                isInt: true,
                min: 0,
                max : 1,
            },
        },
        picture: {
            type: Sequelize.STRING,
        }
    })
}
