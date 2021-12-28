const express = require('express')
const commentCtrl = require('../controllers/comment.controller')
const auth = require('../middlewares/post.auth')

const router = express.Router()

router.get('/', commentCtrl.findAllComments)

router.get('/post/:id', commentCtrl.findCommentsByPostId)

router.get('/user/:id', commentCtrl.findCommentsByUserId)

router.post('/:id', commentCtrl.createComment)

router.put('/:id', commentCtrl.updateComment)

router.delete('/:id', commentCtrl.deleteComment)

module.exports = router