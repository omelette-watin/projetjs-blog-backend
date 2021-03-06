const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Post = require('../models/Post')
const Comment = require('../models/Comment')


const SECRET_KEY = process.env.SECRET_KEY || 'mySecretKey'

exports.canCreateComment = async (req, res, next) => {
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

        if (!(user.isActive === true)) res.status(401).json({
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

exports.canUpdateThisComment = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"]
        const { id } = req.params

        if (!token) return res.status(403).json({
            message: "No token provided"
        })

        const userId = jwt.verify(token, SECRET_KEY).id

        const comment = await Comment.findById(id)
        const user = await User.findById(userId)


        if (!comment) return res.status(404).json({
            message: "Comment not found"
        })

        if (!user) return res.status(404).json({
            message: "User not found"
        })

        if (!(comment.authorId === userId && user.isActive === true)) res.status(401).json({
            message: "Unauthorized"
        })

        next()
    }  catch (err) {
        res.status(500).json({
            message: err.message || "Something went wrong, please try later"
        })
    }
}

exports.canDeleteThisComment = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"]
        const { id } = req.params

        if (!token) return res.status(403).json({
            message: "No token provided"
        })

        const userId = jwt.verify(token, SECRET_KEY).id

        const user = await User.findById(userId)
        const comment = await Comment.findById(id)

        if (!comment) return res.status(404).json({
            message: "Comment not found"
        })

        const post = await Post.findById(comment.postId)

        if (!post) return res.status(404).json({
            message: "Post not found"
        })

        if (!(comment.authorId === userId || user.role === 'admin' || post.authorId === userId && user.isActive === true)) res.status(401).json({
            message: "Unauthorized"
        })

        next()
    }  catch (err) {
        res.status(500).json({
            message: err.message || "Something went wrong, please try later"
        })
    }
}
