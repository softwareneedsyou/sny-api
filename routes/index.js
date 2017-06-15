'use strict'

module.exports = function(routers) {
    require('./ping')(routers.ping.router)
    require('./users')(routers.users.router)
}
