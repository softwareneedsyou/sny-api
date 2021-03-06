'use strict'
const models  = require('../models')
const User    = models.User
const Chapter = models.Chapter
const Score   = models.Score

module.exports = function(router) {
    router
    /**
     * @api {get} /user/ GetUsers
     * @apiGroup Users 
     *
     * @apiSuccess {Object[]} users A object with list of all the users
     * @apiSuccess {Number} users.id
     * @apiSuccess {String} users.firstname
     * @apiSuccess {String} users.lastname
     * @apiSuccess {String} users.username
     * @apiSuccess {String} users.email
     * @apiSuccess {Date} users.createdAt
     */
        .get('/', (req, res) => {
            User.findAll()
                .then(users  => {
                    res.send({ users })
                })
                .catch(error => {
                    res.status(500).send({ error })
                })
        })

    /**
     * @api {get} /user/:user_id GetUser
     * @apiGroup Users 
     *
     * @apiParam {number} id The unique user id
     *
     * @apiSuccess {Object} user
     * @apiSuccess {Number} user.id
     * @apiSuccess {String} user.firstname
     * @apiSuccess {String} user.lastname
     * @apiSuccess {String} user.username
     * @apiSuccess {String} user.email
     * @apiSuccess {Date} user.createdAt
     * @apiSuccess {Date} user.updatedAt
     */
        .get('/:user_id', (req, res) => {
            User.findById(req.params.user_id)
                .then((user) => {
                    res.send({ user })
                })
                .catch(error => {
                    res.status(500).send({ error })
                })
        })

    /**
     * @api {post} /users/ PostUser
     * @apiGroup Users
     *
     * @apiParam {String} user.firstname
     * @apiParam {String} user.lastname
     * @apiParam {String} user.username
     * @apiParam {String} user.email
     *
     * @apiSuccess {Object} user
     * @apiSuccess {Number} user.id
     * @apiSuccess {String} user.firstname
     * @apiSuccess {String} user.lastname
     * @apiSuccess {String} user.username
     * @apiSuccess {String} user.email
     * @apiSuccess {Date} user.createdAt
     * @apiSuccess {Date} user.updatedAt
     *
     * @apiError UserAlreadyExists User already exists. Change your email or username.
     */
        .post('/', (req, res) => {
            User.create({
                username: req.body.username,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
            }).then(user => {
                res.send({ user })
            })
                .catch(error => {
                    res.status(500).send({ error })
                })
        })

    /**
     * @api {post} /users/:user_id/chapters/:chapter_id
     * @apiGroup Users
     *
     * @apiParam {Number} user_id
     * @apiParam {Number} chapter_id
     * @apiParam {Number} score
     *
     * @apiSuccess {Object} user
     * @apiSuccess {Number} user.id
     * @apiSuccess {String} user.firstname
     * @apiSuccess {String} user.lastname
     * @apiSuccess {String} user.username
     * @apiSuccess {String} user.email
     * @apiSuccess {Date} user.createdAt
     * @apiSuccess {Date} user.updatedAt
     *
     * @apiExample {http} Example usage:
     *     http POST http://localhost:3000/users/321/chapters/32 score=123
     */
        .post('/:user_id/chapters/:chapter_id', (req, res, next) => {
            Promise.all([
                User.findById(req.params.user_id),
                Chapter.findById(req.params.chapter_id)
            ])
                .then(([user, chapter]) => {
                    user.addChapter(chapter, { through: { score: req.body.score } })
                    res.send({ user })
                })
                .catch(error => {
                    console.log({ error })
                    res.status(500).send({ error })
                })
        })

    /**
     * @api {delete} /user/:user_id DeleteUser
     * @apiGroup Users
     *
     * @apiParam {number} user_id
     *
     * @apiSuccess {Object} user
     * @apiSuccess {Number} user.id
     * @apiSuccess {String} user.firstname
     * @apiSuccess {String} user.lastname
     * @apiSuccess {String} user.username
     * @apiSuccess {String} user.email
     * @apiSuccess {Date} user.createdAt
     * @apiSuccess {Date} user.updatedAt
     */
        .delete('/:user_id', (req, res) => {
            User.findById(req.params.user_id)
                .then(user => res.send({ user }))
                .catch(error => res.status(500).send({ error }))
        })
}
