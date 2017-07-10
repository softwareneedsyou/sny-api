'use strict';
const models     = require('../models');
const Plugin     = models.Plugin
const PluginType = models.PluginType

module.exports = function(router){
    router
    /**
     * @api {get} /plugins/ GetPlugins
     * @apiGroup Plugins
     *
     * @apiSuccess {Object[]} plugins A list of all the plugins available
     * @apiSuccess {String} plugins.name
     * @apiSuccess {Number} plugins.type_id
     * @apiSuccess {String} plugins.description
     * @apiSuccess {Date} plugins.created_at
     */
        .get('/', (req, res, next) => {
            Plugin.findAll()
                .then(plugins => {
                    res.send({ plugins })
                })
                .catch(error => {
                    res.status(500).send({ error })
                })
        })

    /**
     * @api {get} /plugins/:plugin_id GetPlugin
     * @apiGroup Plugins
     *
     * @apiSuccess {Object} plugin
     * @apiSuccess {String} plugin.name
     * @apiSuccess {String} plugin.description
     * @apiSuccess {Date} plugin.created_at
     */
        .get('/:plugin_id', (req, res, next) => {
            Plugin.findById(req.params.plugin_id)
                .then(plugin => {
                    res.send({ plugin })
                })
                .catch(error => {
                    res.status(500).send({ error })
                })
        })

    /**
     * @api {post} /plugins/ PostPlugin
     * @apiGroup Plugins
     *
     * @apiParam {String} plugin.name
     * @apiParam {String} plugin.description
     * @apiParam {Number} plugin.pluginTypeId
     *
     * @apiSuccess {Object} plugin
     * @apiSuccess {String} plugin.name
     * @apiSuccess {String} plugin.description
     * @apiSuccess {Date} plugin.created_at
     *
     * @apiError PluginAlreadyExists
     */
        .post('/', (req, res, next) => {
            Promise.all([
                Plugin.create({
                    name: req.body.name,
                    description: req.body.description,
                }),
                PluginType.findById(req.body.pluginTypeId)
            ]).then(([plugin, pluginType]) => {
                plugin.setPluginType(pluginType)
                res.send({ plugin })
            }).catch(error => {
                res.status(500).send({ error })
            })
        })

    /**
     * @api {delete} /plugins/:plugin_id DeletePlugin
     * @apiGroup Plugins
     *
     * @apiParam {number} plugin_id
     *
     * @apiSuccess {Object} plugin
     * @apiSuccess {String} plugin.name
     * @apiSuccess {String} plugin.description
     * @apiSuccess {Date} plugin.created_at
     */
        .delete('/:plugin_id', (req, res) => {
            Plugin.findById(req.params.plugin_id)
                .then(plugin => res.send({ plugin }))
                .catch(error => res.status(500).send({ error }))
        })

}
