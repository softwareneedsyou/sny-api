'use strict'
var config = {
    mysql: {},
    express: {},
}

// MySQL
config.mysql.dev_url       = '127.0.0.1'
config.mysql.docker_url    = '172.17.0.2'
config.mysql.database      = 'sny'
config.mysql.prod_url      = ''
config.mysql.root          = 'root'
config.mysql.root_password = 'toor'
config.mysql.user          = 'sny'
config.mysql.user_password = 'iliketrains'

// Express
config.express.port = '3000'

module.exports = config
