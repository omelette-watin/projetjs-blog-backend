const express = require('express')
const commentCtrl = require('../controllers/comment.controller')
const auth = require('../middlewares/comment.auth')

const router = express.Router()

router.get('/', commentCtrl.findAllComments)

router.get('/post/:id', commentCtrl.findCommentsByPostId)

router.get('/user/:id', commentCtrl.findCommentsByUserId)

router.post('/:id', [auth.canCreateComment], commentCtrl.createComment)

router.put('/:id', [auth.canUpdateThisComment], commentCtrl.updateComment)

router.delete('/:id', [auth.canDeleteThisComment] ,commentCtrl.deleteComment)

module.exports = router