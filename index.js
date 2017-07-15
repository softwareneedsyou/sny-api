'use strict';
const bodyParser = require('body-parser')
const config = require('./config')
const port = config.express.port

const express = require('express')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

var routers = {
    ping:        { route: '/ping' },
    users:       { route: '/users' },
    plugins:     { route: '/plugins' },
    chapters:    { route: '/chapters' },
    pluginTypes: { route: '/pluginTypes' },
    stories:     { route: '/stories' },
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
