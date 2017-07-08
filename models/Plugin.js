'use strict'
const Sequelize = require('sequelize')

module.exports = function(sequelize) {
    return sequelize.define('Plugin', {
        name: {
            type: Sequelize.STRING,
        },
        description: {
            type: Sequelize.TEXT,
        }
    })
}
