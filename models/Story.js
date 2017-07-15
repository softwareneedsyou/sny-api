'use strict';
const Sequelize = require('sequelize')

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Story', {
        name: {
            type: Sequelize.STRING,
        },
        description: {
            type: Sequelize.TEXT
        }
    })
}
