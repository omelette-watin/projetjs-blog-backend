const Post = require('../models/Post')
const Comment = require('../models/Comment')
const { now } = require('mongoose')

exports.findAllPublishedPosts = async (req, res) => {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const skipIndex = (page - 1) * limit
    try {
        if (page && limit) {
            const posts = await Post.find()
                .sort({ creationDate : -1})
                .limit(limit)
                .skip(skipIndex)
            return res.json(posts)
        }
        const posts = await Post.find().sort({ creationDate : -1})
        return res.json(posts)
    } catch (err) {
        return res.status(500).json({
            message: err.message || "Something went wrong, please try later"
        })
    }
}

exports.findAllPublishedPostsIds = async (req, res) => {
    try {
        const posts = await Post.find({ isPublished: true }).select({ _id: 1})
        return res.json(posts)
    } catch (err) {
        return res.status(500).json({
            message: err.message || "Something went wrong, please try later"
        })
    }
}


exports.findOnePublishedPostByPostId = async (req, res) => {
    const { id } = req.params

    try {
        const post = await Post.findOne({ _id: id, isPublished: true })

        if (!post) return res.status(404).json({
            message: "Post not found"
        })

        return res.json(post)
    } catch (err) {
        return res.status(500).json({
            message: err.message || "Something went wrong, please try later"
        })
    }
}

exports.findPublishedPostsByUserId = async (req, res) => {
    const { id } = req.params

    try {
        const posts = await Post.find({ authorId: id, isPublished: true })

        return res.json(posts)
    } catch (err) {
        return res.status(500).json({
            message: err.message || "Something went wrong, please try later"
        })
    }
}

exports.findSavedPostsByUserId = async (req, res) => {
    const { id } = req.params

    try {
        const posts = await Post.find({ authorId: id, isPublished: false })

        return res.json(posts)
    } catch (err) {
        return res.status(500).json({
            message: err.message || "Something went wrong, please try later"
        })
    }
}


exports.createPost = async (req, res) => {
    const { title, content } = req.body

    try {
        const newPost = new Post({
            title,
            content,
            creationDate: now(),
            authorId: req.userId,
            authorName: req.username
        })

        const postSaved = await newPost.save()
        return res.json(postSaved)
    } catch (err) {
        return res.status(500).json({
            message: err.message || "Something went wrong, please try later"
        })
    }
}

exports.publishPost = async (req, res) => {
    const { id } = req.params

    try {
        const post = await Post.findById(id);

        if (!post) return res.status(404).json({
            message: "This user has no posts"
        })

        const publishedPost = await Post.findOneAndUpdate({ _id: id }, { isPublished: true, publicationDate: now() })

        return res.json({
            message: "Post successfuly published"
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message || "Something went wrong, please try later"
        })
    }
}

exports.createAndPublishPost = exports.createPost = async (req, res) => {
    const { title, content } = req.body

    try {
        const newPost = new Post({
            title,
            content,
            creationDate: now(),
            authorId: req.userId,
            authorName: req.username,
            isPublished: true,
            publicationDate: now()
        })

        const postSaved = await newPost.save()

        return res.json(postSaved)
    } catch (err) {
        return res.status(500).json({
            message: err.message || "Something went wrong, please try later"
        })
    }
}

exports.updatePost = async (req, res) => {
    const { id } = req.params
    const { title, content } = req.body

    try {
        const updatedPost = await Post.findOneAndUpdate(
            { _id: id },
            {
                title,
                content,
                modificationDate: now()
            }
        )
        if (!updatedPost) return res.status(404).json({
            message: "Post not found"
        })
        return res.json({
            message: "Post successfuly updated"
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message || "Something went wrong, please try later"
        })
    }
}

exports.deletePost = async (req, res) => {
    const { id } = req.params

    try {
        const deletedPost = await Post.findOneAndDelete(id)
        if (!deletedPost) return res.status(404).json({
            message: "Post not found"
        })
        await Comment.deleteMany({ postId: id })
        return res.json({
            message: "Post successfuly deleted"
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message || "Something went wrong, please try later"
        })
    }
}

exports.addView = async (req, res) => {
    const { id } = req.params

    try {
        const post = await Post.findOneAndUpdate({ _id: id, isPublished: true }, { $inc: { views: 1 } })

        if (!post) return res.status(404).json({
            message: "Post not found"
        })

        return res.json({
            message: "View successfuly added"
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message || "Something went wrong, please try later"
        })
    }
}
