'use strict';
const Sequelize = require('sequelize')

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Story', {
        name: {
            type: Sequelize.STRING,
            validate: {
              notEmpty: true,
              len: [3,20],
            },
        },
        description: {
            type: Sequelize.TEXT,
            validate: {
              notEmpty: true,
              len: [3,255],
            },
        },
        compilator: {
            type: Sequelize.INTEGER,
            validate: {
              notEmpty: true,
              isNumeric: true,
              isInt: true,
              min: 1,
            },
        },
    })
}
