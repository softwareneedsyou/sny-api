'use strict'
const random128Hex = require('../core/random128').random128Hex
const jwt = require('jwt-simple')
const models  = require('../models')
const config = require('../config')
const User    = models.User
const Chapter = models.Chapter
const Score   = models.Score

//File Download
var path = require('path');
var mime = require('mime');
var fs = require('fs');

//File Upload
const multer  = require('multer')

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploadsUser")
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

var upload = multer({storage})

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
     * @apiSuccess {Boolean} users.admin
     * @apiSuccess {Date} users.createdAt
     */
        .get('/', (req, res) => {
            User.findAll({
                attributes: {
                    exclude: ['password', 'token']
                }
            })
                .then(users  => {
                    res.send(users)
                })
                .catch(error => {
                    res.status(500).send(error)
                })
        })


    /**
     * @api {get} /user/user_id/picture GetUserPicture
     * @apiGroup Users
     *
     * @apiSuccess {file} username.jpg
     */
      .get('/:user_id/picture', function(req, res){
        User.findById(req.params.user_id)
        .then(user => {
          var file = "uploadsUser/" + user.username + ".jpg";
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
     * @apiSuccess {Boolean} users.admin
     * @apiSuccess {Date} user.createdAt
     * @apiSuccess {Date} user.updatedAt
     */
        .get('/:user_id', (req, res) => {
            User.findById(req.params.user_id, {
                attributes: {
                    exclude: ['password', 'token']
                }
            })
                .then((user) => {
                    res.send(user)
                })
                .catch(error => {
                    res.status(500).send(error)
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
     * @apiSuccess {Boolean} users.admin
     * @apiSuccess {Date} user.createdAt
     * @apiSuccess {Date} user.updatedAt
     *
     * @apiError UserAlreadyExists User already exists. Change your email or username.
     */

        .post('/', upload.single('avatar'), (req, res) => {
            const username = req.body.username
            const password = req.body.password
            const token = jwt.encode({username, password}, random128Hex())
            User.create({
                username,
                password,
                token,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                admin: req.body.admin,
                picture: '/uploadsUser/' + req.body.username + ".jpg",
            }
          ).then(user => {
                res.send(user)
            })
                .catch(error => {
                    res.status(500).send(error)
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
     * @apiSuccess {Boolean} users.admin
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
                    res.send(user)
                })
                .catch(error => {
                    res.status(500).send(error)
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
     * @apiSuccess {Boolean} users.admin
     * @apiSuccess {Date} user.createdAt
     * @apiSuccess {Date} user.updatedAt
     */
        .delete('/:user_id', (req, res) => {
            User.findById(req.params.user_id)
            .then(user => {
                user.destroy()
                .then(user => res.send(user))
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
       * @apiSuccess {Object} user
       * @apiSuccess {String} user.firstname
       * @apiSuccess {String} user.lastname
       * @apiSuccess {String} user.username
       * @apiSuccess {String} user.email
       * @apiSuccess {Boolean} users.admin
       * @apiSuccess {Date} user.createdAt
       * @apiSuccess {Date} user.updatedAt
       */
        .put('/:user_id', (req, res) => {
            User.findById(req.params.user_id)
            .then(user => {
                user.update(
                  { username : req.body.username,
                    firstname : req.body.firstname,
                    lastname : req.body.lastname,
                    email : req.body.email,
                    admin : req.body.admin},
                  { where : {id : req.params.user_id} }
                )
                .then(user => {
                    res.send(user)
                }).catch(error => {
                    res.status(500).send(error)
                })
            }).catch(error => {
                res.status(404).send(error)
            })
        })
}
