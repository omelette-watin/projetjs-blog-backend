const express = require('express')
const postCtrl = require('../controllers/post.controller')

const router = express.Router()

router.get('/', postCtrl.findAllPosts)

router.get('/:id', postCtrl.findOnePostById)

router.get('/user/:id', postCtrl.findPostsByUserId)

router.post('/', postCtrl.createPost)

router.put('/:id', postCtrl.updatePost)

router.delete('/:id', postCtrl.deletePost)

module.exports = router