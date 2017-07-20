'use strict';
const Sequelize = require('sequelize')

module.exports = function(sequelize) {
    return sequelize.define('Score', {
        score: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
              notEmpty: true,
              isNumeric: true,
              isInt: true,
              min: 0,
            },
        }
    })
}
