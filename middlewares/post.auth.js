const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Post = require('../models/Post')

require('dotenv').config()
const SECRET_KEY = process.env.SECRET_KEY

exports.canCreatePost = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"]

        if (!token) return res.status(403).json({
            message: "No token provided"
        })

        req.userId = jwt.verify(token, SECRET_KEY).id

        const user = await User.findById(req.userId)



        if (!user) return res.status(404).json({
            message: "No user found"
        })

        if (!(user.role === 'author' || user.role === 'admin' && user.isActive === true))  return res.status(401).json({
            message: "Unauthorized"
        })
        req.username = user.username

        next()
    } catch (err) {
        res.status(500).json({
            message: err.message || "Something went wrong, please try later"
        })
    }
}

exports.canUpdateThisPost = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"]
        const { id } = req.params

        if (!token) return res.status(403).json({
            message: "No token provided"
        })

        const userId = jwt.verify(token, SECRET_KEY).id

        const post = await Post.findById(id)
        const user = await User.findById(userId)

        if (!user) return res.status(404).json({
            message: "No user found"
        })

        if (!post) return res.status(404).json({
            message: "Post not found"
        })

        if (!(post.authorId === userId && user.isActive === true)) res.status(401).json({
            message: "Unauthorized"
        })

        next()
    }  catch (err) {
        res.status(500).json({
            message: err.message || "Something went wrong, please try later"
        })
    }
}

exports.canSeeHisSavedPosts = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"]
        const { id } = req.params

        if (!token) return res.status(403).json({
            message: "No token provided"
        })

        const userId = jwt.verify(token, SECRET_KEY).id

        if (!(userId === id)) res.status(401).json({
            message: "Unauthorized"
        })

        next()
    }  catch (err) {
        res.status(500).json({
            message: err.message || "Something went wrong, please try later"
        })
    }
}

exports.canDeleteThisPost = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"]
        const { id } = req.params

        if (!token) return res.status(403).json({
            message: "No token provided"
        })

        const userId = jwt.verify(token, SECRET_KEY).id

        const user = await User.findById(userId)
        const post = await Post.findById(id)

        if (!post) return res.status(404).json({
            message: "Post not found"
        })

        if (!(post.authorId === userId && user.role === 'admin' && user.isActive === true)) res.status(401).json({
            message: "Unauthorized"
        })

        next()
    }  catch (err) {
        res.status(500).json({
            message: err.message || "Something went wrong, please try later"
        })
    }
}
