'use strict'
const sequelize = require('./sequelize').sequelize

const User       = require('./User')(sequelize)
const Plugin     = require('./Plugin')(sequelize)
const PluginType = require('./PluginType')(sequelize)
const Chapter    = require('./Chapter')(sequelize)

Plugin.belongsTo(PluginType)

const models = {
    User,
    Plugin,
    Chapter,
    PluginType,
}

sequelize.sync()
    .then(console.log('database synced.'))

module.exports = models
