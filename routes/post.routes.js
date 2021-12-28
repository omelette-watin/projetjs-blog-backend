const express = require('express')
const postCtrl = require('../controllers/post.controller')
const auth = require('../middlewares/auth')

const router = express.Router()

router.get('/', postCtrl.findAllPublishedPosts)

router.get('/:id', postCtrl.findOnePublishedPostByPostId)

router.get('/user/:id', postCtrl.findPublishedPostsByUserId)

router.get('/saved/:id', [auth.hasCorrectId], postCtrl.findSavedPostsByUserId)

router.post('/', [auth.hasAuthorRole], postCtrl.createPost)

router.post('/:id', [auth.hasCorrectAuthorId], postCtrl.publishPost)

router.put('/:id', [auth.hasCorrectAuthorId], postCtrl.updatePost)

router.delete('/:id', [auth.hasCorrectAuthorIdOrIsAdmin], postCtrl.deletePost)

module.exports = router