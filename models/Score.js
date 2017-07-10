'use strict';
const Sequelize = require('sequelize')

module.exports = function(sequelize) {
    return sequelize.define('Score', {
        score: {
            type: Sequelize.INTEGER,
        }
    })
}
