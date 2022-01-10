const express = require('express')
const postCtrl = require('../controllers/post.controller')
const auth = require('../middlewares/post.auth')

const router = express.Router()

router.get('/', postCtrl.findAllPublishedPosts)

router.get('/ids', postCtrl.findAllPublishedPostsIds)

router.get('/:id', postCtrl.findOnePublishedPostByPostId)

router.get('/user/:id', postCtrl.findPublishedPostsByUserId)

router.get('/saved/:id', [auth.canSeeHisSavedPosts], postCtrl.findSavedPostsByUserId)

router.post('/', [auth.canCreatePost], postCtrl.createPost)

router.post('/publish', [auth.canCreatePost], postCtrl.createAndPublishPost)

router.post('/:id', [auth.canUpdateThisPost], postCtrl.publishPost)

router.put('/views/:id', [auth.canAddView] ,postCtrl.addView)

router.put('/:id', [auth.canUpdateThisPost], postCtrl.updatePost)

router.delete('/:id', [auth.canDeleteThisPost], postCtrl.deletePost)

module.exports = router