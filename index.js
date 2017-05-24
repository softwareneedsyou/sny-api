'use strict'; const config = require('./config')
const port = config.express.port

const express = require('express')

const app = express()

var routers = {
    ping: { route: '/ping' },
}

Object.keys(routers).map(router => {
    routers[router].router = express.Router()
    app.use(routers[router].route, routers[router].router)
})

require('./routes')(routers)

app.get('*', (req, res, next) => {
    res.status(404).end()
})

app.listen(port, () => {
    console.info('Server listening on port ' + port)
})
