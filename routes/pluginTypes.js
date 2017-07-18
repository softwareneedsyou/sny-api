'use strict';
const models = require('../models');
const pluginType = models.PluginType

module.exports = function(router){
    router
    /**
     * @api {get} /pluginTypes/ GetpluginTypes
     * @apiGroup PluginTypes
     *
     * @apiSuccess {Object[]} pluginTypes A list of all the pluginTypes available
     * @apiSuccess {String} pluginTypes.name
     * @apiSuccess {Number} pluginTypes.type_id
     * @apiSuccess {String} pluginTypes.description
     * @apiSuccess {Date} pluginTypes.created_at
     */
        .get('/', (req, res, next) => {
            pluginType.findAll()
                .then(pluginTypes => {
                    res.send({ pluginTypes })
                })
                .catch(error => {
                    res.status(500).send({ error })
                })
        })

    /**
     * @api {get} /pluginTypes/:pluginType_id GetpluginType
     * @apiGroup PluginTypes
     *
     * @apiSuccess {Object} pluginType
     * @apiSuccess {String} pluginType.name
     * @apiSuccess {String} pluginType.description
     * @apiSuccess {Date} pluginType.created_at
     */
        .get('/:pluginType_id', (req, res, next) => {
            pluginType.findById(req.params.pluginType_id)
                .then(pluginType => {
                    res.send({ pluginType })
                })
                .catch(error => {
                    res.status(500).send({ error })
                })
        })

    /**
     * @api {post} /pluginTypes/ PostpluginType
     * @apiGroup PluginTypes
     *
     * @apiParam {String} pluginType.name
     * @apiParam {String} pluginType.description
     *
     * @apiSuccess {Object} pluginType
     * @apiSuccess {String} pluginType.name
     * @apiSuccess {String} pluginType.description
     * @apiSuccess {Date} pluginType.created_at
     *
     * @apiError pluginTypeAlreadyExists
     */
        .post('/', (req, res, next) => {
            pluginType.create({
                name: req.body.name,
                description: req.body.description,
            })
                .then(pluginType => {
                    res.send({ pluginType })
                }).catch(error => {
                    res.status(500).send({ error })
                })
        })

    /**
     * @api {delete} /pluginTypes/:pluginType_id DeletePluginType
     * @apiGroup PluginTypes
     *
     * @apiParam {number} pluginType_id
     *
     * @apiSuccess {Object} pluginType
     * @apiSuccess {String} pluginType.name
     * @apiSuccess {String} pluginType.description
     * @apiSuccess {Date} pluginType.created_at
     */
        .delete('/:pluginType_id', (req, res) => {
            PluginType.findById(req.params.pluginType_id)
            .then(pluginType => {
                pluginType.destroy()
                .then(pluginType => res.send({ pluginType }))
                .catch(error => res.status(500).send({ error }))
            }).catch(error => {
                res.status(404).send({ error })
            })
        })


      /**
       * @api {put} /user/:user_id DeleteUser
       * @apiGroup Users
       *
       * @apiParam {number} user_id
       *
       * @apiSuccess {Object} chapter
       * @apiSuccess {String} chapter.name
       * @apiSuccess {String} chapter.description
       */
          .put('/:pluginType_id', (req, res) => {
            PluginType.findById(res.params.pluginType)
            .then(pluginType => {
                pluginType.update(
                  { name : req.body.name,
                    description : req.body.description},
                  { where : {id : req.params.pluginType_id} }
                )
                .then(chapter => {
                    res.send({ chapter })
                }).catch(error => {
                    res.status(500).send({ error })
                })
            }).catch(error => {
                res.status(404).send({ error })
            })

          })

}
