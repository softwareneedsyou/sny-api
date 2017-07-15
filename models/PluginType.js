'use strict'
const Sequelize = require('sequelize')

module.exports = function(sequelize) {
    return sequelize.define('PluginType', {
        name: {
            type: Sequelize.STRING,
        },
        description: {
            type: Sequelize.TEXT,
        }
    })
}
