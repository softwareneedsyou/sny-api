'use strict'

module.exports = function(routers) {
    require('./ping')(routers.ping.router)
    require('./login')(routers.login.router)
    require('./users')(routers.users.router)
    require('./plugins')(routers.plugins.router)
    require('./chapters')(routers.chapters.router)
    require('./pluginTypes')(routers.pluginTypes.router)
    require('./stories')(routers.stories.router)
}
