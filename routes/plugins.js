'use strict';
const models     = require('../models');
const Plugin     = models.Plugin
const PluginType = models.PluginType

//File Dowload
var path = require('path');
var mime = require('mime');
var fs = require('fs');

//File Upload
const multer  = require('multer')

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploadsPlugin")
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

var upload = multer({storage})

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
                    res.send(plugins)
                })
                .catch(error => {
                    res.status(500).send(error)
                })
        })


    /**
     * @api {get} /plugin/plugin_id/plugin GetPluginFile
     * @apiGroup Plugin
     *
     * @apiSuccess {file} plugin_name.jpg
     */
      .get('/:plugin_id/plugin', function(req, res){
        Plugin.findById(req.params.plugin_id)
        .then(plugin => {
          var file = "uploadsPlugin/" + plugin.name + ".zip";
          var filename = path.basename(file);
          var mimetype = mime.lookup(file);

          res.setHeader('Content-disposition', 'attachment; filename=' + filename);
          res.setHeader('Content-type', mimetype);

          var filestream = fs.createReadStream(file);
          filestream.pipe(res);
        }).catch(error => {
          res.status(404).send(error)
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
                    res.send(plugin)
                })
                .catch(error => {
                    res.status(500).send(error)
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
        .post('/', upload.single('plugin'), (req, res, next) => {
            Promise.all([
                Plugin.create({
                    name: req.body.name,
                    description: req.body.description,
                    url: '/uploadsPlugin/' + req.body.name + ".zip",
                }),
                PluginType.findById(req.body.pluginTypeId)
            ])
                .then(([plugin, pluginType]) => {
                    plugin.setPluginType(pluginType)
                    res.send(plugin)
                }).catch(error => {
                    res.status(500).send(error)
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
            .then(plugin => {
                plugin.destroy()
                .then(plugin => res.send(plugin))
                .catch(error => res.status(500).send(error))
            }).catch(error => {
                res.status(404).send(error)
            })
        })


        .put('/:plugin_id', (req, res) => {
            Promise.all([
                Plugin.findById(req.params.plugin_id),
                PluginType.findById(req.body.pluginTypeId),
            ])
            .then(([plugin, pluginType]) => {
                plugin.update({
                  name: req.body.name,
                  description: req.body.description,
                }).then(plugin => {
                  plugin.setPluginType(pluginType)
                  res.send(plugin)
                }).catch(error => {
                  res.status(500).send(error)
                })
            }).catch(error => {
                res.status(404).send(error)
            })
        })

}
