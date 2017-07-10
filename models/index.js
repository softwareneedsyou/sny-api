'use strict'
const sequelize = require('./sequelize').sequelize

const User       = require('./User')(sequelize)
const Plugin     = require('./Plugin')(sequelize)
const PluginType = require('./PluginType')(sequelize)
const Chapter    = require('./Chapter')(sequelize)
const Story      = require('./Story')(sequelize)
const Score      = require('./Score')(sequelize)

Plugin.belongsTo(PluginType)
Chapter.hasMany(Story)
User.belongsToMany(Chapter, { through: Score })
Chapter.belongsToMany(User, { through: Score })

const models = {
    User,
    Plugin,
    Chapter,
    PluginType,
    Story,
    Score,
}

sequelize.sync()
    .then(console.log('database synced.'))

module.exports = models
