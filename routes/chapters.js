'use strict';
const models = require('../models');
const Chapter = models.Chapter

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
                    res.send({ chapters })
                })
                .catch(error => {
                    res.status(500).send({ error })
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
                    res.send({ chapter })
                })
                .catch(error => {
                    res.status(500).send({ error })
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
        .post('/', (req, res, next) => {
            Chapter.create({
                name: req.body.name,
                description: req.body.description,
            })
                .then(chapter => {
                    res.send({ chapter })
                }).catch(error => {
                    res.status(500).send({ error })
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
            Chapter.destroy(
              {where : {id : req.params.chapter_id}}
            )
            .then(chapter => res.send({ chapter }))
            .catch(error => res.status(500).send({ error }))
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
            Chapter.update(
              { name : req.body.name,
                description : req.body.description},
              { where : {id : req.params.chapter_id} }
            )
            .then(chapter => {
                    res.send({ chapter })
                }).catch(error => {
                    res.status(500).send({ error })
                })
          })

}
