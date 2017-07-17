'use strict'
const Sequelize = require('sequelize')

module.exports = function(sequelize) {
    return sequelize.define('PluginType', {
        name: {
            type: Sequelize.STRING,
            validate: {
              notNull: true,
              notEmpty: true,
              len: [3,20],
            },
        },
        description: {
            type: Sequelize.TEXT,
            validate: {
              notNull: true,
              notEmpty: true,
              len: [3,255],
            },
        }
    })
}
