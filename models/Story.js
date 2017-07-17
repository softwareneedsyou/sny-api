'use strict';
const Sequelize = require('sequelize')

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Story', {
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
        },
        compilator: {
            type: Sequelise.INTEGER,
            validate: {
              notNull: true,
              notEmpty: true,
              isNumeric: true,
              isInt: true,
              min: 1,
            },
        }
    })
}
