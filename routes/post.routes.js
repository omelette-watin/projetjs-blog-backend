const express = require('express')
const postCtrl = require('../controllers/post.controller')
const auth = require('../middlewares/post.auth')

const router = express.Router()

router.get('/', postCtrl.findAllPublishedPosts)

router.get('/:id', postCtrl.findOnePublishedPostByPostId)

router.get('/user/:id', postCtrl.findPublishedPostsByUserId)

router.get('/saved/:id', [auth.canSeeHisSavedPosts], postCtrl.findSavedPostsByUserId)

router.post('/', [auth.canCreatePost], postCtrl.createPost)

router.post('/:id', [auth.canUpdateThisPost], postCtrl.publishPost)

router.put('/:id', [auth.canUpdateThisPost], postCtrl.updatePost)

router.delete('/:id', [auth.canDeleteThisPost], postCtrl.deletePost)

module.exports = router