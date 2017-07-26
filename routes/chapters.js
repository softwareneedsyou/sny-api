'use strict';
const models = require('../models');
const Chapter = models.Chapter

//File Dowload
var path = require('path');
var mime = require('mime');
var fs = require('fs');

//File Upload
const multer  = require('multer')

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploadsChapter")
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

var upload = multer({storage})

module.exports = function(router){
    router
    /**
     * @api {get} /chapters/ GetChapters
     * @apiGroup Chapters
     *
     * @apiSuccess {Object[]} chapters A list of all the chapters available
     * @apiSuccess {String} chapters.name
     * @apiSuccess {String} chapters.description
     * @apiSuccess {Date} chapters.created_at
     */
        .get('/', (req, res, next) => {
            Chapter.findAll()
                .then(chapters => {
                    res.send(chapters)
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
      .get('/:chapter_id/chapter', function(req, res){
        Chapter.findById(req.params.chapter_id)
        .then(chapter => {
          var file = "uploadsChapter/" + chapter.name + ".jar";
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
     * @api {get} /chapters/:chapter_id GetChapter
     * @apiGroup Chapters
     *
     * @apiSuccess {Object} chapter
     * @apiSuccess {String} chapter.name
     * @apiSuccess {String} chapter.description
     * @apiSuccess {Date} chapter.created_at
     */
        .get('/:chapter_id', (req, res, next) => {
            Chapter.findById(req.params.chapter_id)
                .then(chapter => {
                    res.send(chapter)
                })
                .catch(error => {
                    res.status(500).send(error)
                })
        })

    /**
     * @api {post} /chapters/ PostChapter
     * @apiGroup Chapters
     *
     * @apiParam {String} chapter.name
     * @apiParam {String} chapter.description
     *
     * @apiSuccess {Object} chapter
     * @apiSuccess {String} chapter.name
     * @apiSuccess {String} chapter.description
     * @apiSuccess {Date} chapter.created_at
     *
     * @apiError ChapterAlreadyExists
     */
        .post('/', upload.single('chapter'), (req, res, next) => {
            Chapter.create({
                name: req.body.name,
                description: req.body.description,
                url: '/uploadsChapter/' + req.body.name + ".jar"
            })
                .then(chapter => {
                    res.send(chapter)
                }).catch(error => {
                    res.status(500).send(error)
                })
        })

    /**
     * @api {delete} /chapters/:chapter_id DeleteChapter
     * @apiGroup Chapters
     *
     * @apiParam {number} chapter_id
     *
     * @apiSuccess {Object} chapter
     * @apiSuccess {String} chapter.name
     * @apiSuccess {String} chapter.description
     * @apiSuccess {Date} chapter.created_at
     */
        .delete('/:chapter_id', (req, res) => {
            Chapter.findById(req.params.chapter_id)
            .then(chapter => {
                chapter.destroy()
                .then(chapter => res.send(chapter))
                .catch(error => res.status(500).send(error))
            }).catch(error => {
                res.status(404).send(error)
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
          .put('/:chapter_id', (req, res) => {
            Chapter.findById(req.params.chapter_id)
            .then(chapter => {
                chapter.update(
                  { name : req.body.name,
                    description : req.body.description},
                  { where : {id : req.params.chapter_id} }
                )
                .then(chapter => {
                    res.send(chapter)
                }).catch(error => {
                    res.status(500).send(error)
                })
            }).catch(error => {
                res.status(404).send (error)
            })
          })
}
