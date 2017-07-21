'use strict';
const Sequelize = require('sequelize')

module.exports = function(sequelize) {
    return sequelize.define('Chapter', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
              notEmpty: true,
            },
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false,
            validate: {
              notEmpty: true,
            },
        }
    })
}
