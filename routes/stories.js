'use strict';
const models  = require('../models');
const Story   = models.Story
const Chapter = models.Chapter

module.exports = function(router){
    router
    /**
     * @api {get} /stories/ GetStories
     * @apiGroup Stories
     *
     * @apiSuccess {Object[]} stories A list of all the stories available
     * @apiSuccess {String} stories.name
     * @apiSuccess {Number} stories.type_id
     * @apiSuccess {String} stories.description
     * @apiSuccess {Date} stories.created_at
     */
        .get('/', (req, res, next) => {
            Story.findAll()
                .then(stories => {
                    res.send(stories)
                })
                .catch(error => {
                    res.status(500).send(error)
                })
        })

    /**
     * @api {get} /stories/:story_id GetStory
     * @apiGroup Stories
     *
     * @apiSuccess {Object} story
     * @apiSuccess {String} story.name
     * @apiSuccess {String} story.description
     * @apiSuccess {Date} story.created_at
     */
        .get('/:story_id', (req, res, next) => {
            Story.findById(req.params.story_id)
                .then(story => {
                    res.send(story)
                })
                .catch(error => {
                    res.status(500).send(error)
                })
        })

    /**
     * @api {post} /stories/ PostStory
     * @apiGroup Stories
     *
     * @apiParam {String} story.name
     * @apiParam {String} story.description
     * @apiParam {Number} story.chapterId
     *
     * @apiSuccess {Object} story
     * @apiSuccess {String} story.name
     * @apiSuccess {String} story.description
     * @apiSuccess {Date} story.created_at
     *
     * @apiError StoryAlreadyExists
     */
        .post('/', (req, res, next) => {
            Promise.all([
                Story.create({
                    name: req.body.name,
                    description: req.body.description,
                    compilator: req.body.compilator,
                }),
                Chapter.findById(req.body.chapterId)
            ])
                .then(([story,chapter]) => {
                    chapter.setStories(story)
                    res.send(chapter)
                }).catch(error => {
                    console.log(" "  + error);
                    res.status(500).send(error)
                })
        })

    /**
     * @api {delete} /stories/:story_id DeleteStory
     * @apiGroup Stories
     *
     * @apiParam {number} story_id
     *
     * @apiSuccess {Object} story
     * @apiSuccess {String} story.name
     * @apiSuccess {String} story.description
     * @apiSuccess {Date} story.created_at
     */
        .delete('/:story_id', (req, res) => {
          Story.findById(req.params.story_id)
          .then(story => {
              story.destroy()
              .then(story => res.send(story))
              .catch(error => res.status(500).send(error))
          }).catch(error => {
              res.status(404).send(error)
          })
        })


      /**
       * @api {put} /stories/:story_id UpdateStory
       * @apiGroup Stories
       *
       * @apiParam {number} story_id
       *
       * @apiSuccess {Object} story
       * @apiSuccess {String} story.name
       * @apiSuccess {String} story.description
       * @apiSuccess {Date} story.created_at
       */
        .put('/:story_id', (req, res) => {
            Promise.all([
                Story.findById(req.params.story_id),
                Chapter.findById(req.body.chapterId)
            ])
            .then(([story,chapter]) => {
                story.update({
                  name: req.body.name,
                  description: req.body.description,
                  compilator: req.body.compilator,
                }).then(story => {
                  chapter.setStories(story)
                  res.send(chapter)
                }).catch(error => {
                  res.status(500).send(error)
                })
            }).catch(error => {
                res.status(404).send(error)
            })
        })
}
