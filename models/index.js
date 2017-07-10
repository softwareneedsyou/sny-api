'use strict'
const sequelize = require('./sequelize').sequelize

const models = {
    User: require('./User')(sequelize),
    Plugin: require('./Plugin')(sequelize),
    Chapter: require('./Chapter')(sequelize),
}

sequelize.sync()
    .then(console.log('database synced.'))

module.exports = models
