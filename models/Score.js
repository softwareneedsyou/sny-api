'use strict';
const Sequelize = require('sequelize')

module.exports = function(sequelize) {
    return sequelize.define('Score', {
        score: {
            type: Sequelize.INTEGER,
            validate: {
              notNull: true,
              notEmpty: true,
              isNumeric: true,
              isInt: true,
              min: 0,
            },
        }
    })
}
