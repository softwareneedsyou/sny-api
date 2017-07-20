'use strict'
const Sequelize = require('sequelize')

module.exports = function(sequelize) {
    return sequelize.define('Plugin', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
              notEmpty: true,
              len: [3,20],
            },
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false,
            validate: {
              notEmpty: true,
              len: [3,255],
            },
        }
    })
}
