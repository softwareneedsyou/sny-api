'use strict'
var config = {
    mysql: {},
    express: {},
    jwt: {},
}

// MySQL
config.mysql.dev_url       = '127.0.0.1'
config.mysql.docker_url    = '172.21.0.2'
config.mysql.database      = 'sny'
config.mysql.prod_url      = ''
config.mysql.root          = 'root'
config.mysql.root_password = 'toor'
config.mysql.user          = 'sny'
config.mysql.user_password = 'iliketrains'

// Express
config.express.port = '3000'

// JWT
config.jwt.secret = Buffer.from('fe1a1915a379f3be5394b64d14794932', 'hex')

module.exports = config
