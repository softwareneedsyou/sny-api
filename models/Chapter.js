'use strict';
const Sequelize = require('sequelize')

module.exports = function(sequelize) {
    return sequelize.define('Chapter', {
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
        }
    })
}
