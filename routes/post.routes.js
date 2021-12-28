const express = require('express')
const postCtrl = require('../controllers/post.controller')

const router = express.Router()

router.get('/', postCtrl.findAllPublishedPosts)

router.get('/:id', postCtrl.findOnePublishedPostByPostId)

router.get('/user/:id', postCtrl.findPublishedPostsByUserId)

router.get('/saved/:id', postCtrl.findSavedPostsByUserId)

router.post('/', postCtrl.createPost)

router.post('/:id', postCtrl.publishPost)

router.put('/:id', postCtrl.updatePost)

router.delete('/:id', postCtrl.deletePost)

module.exports = router