const Post = require('../models/Post')

exports.findAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
        res.json(posts)
    } catch (err) {
        res.status(500).json({
            message: err.message || "Something went wrong, please try later"
        })
    }
}

exports.findOnePostById = async (req, res) => {
    const { id } = req.params

    try {
        const post = await Post.findById(id)

        if (!post) return res.status(404).json({
            message: "Post not found"
        })

        res.json(post)
    } catch (err) {
        res.status(500).json({
            message: err.message || "Something went wrong, please try later"
        })
    }
}

exports.findPostsByUserId = async (req, res) => {
    const { id } = req.params

    try {
        const post = await Post.find({ authorId: id})

        if (!post) return res.status(404).json({
            message: "This user has no posts"
        })

        res.json(post)
    } catch (err) {
        res.status(500).json({
            message: err.message || "Something went wrong, please try later"
        })
    }
}


exports.createPost = async (req, res) => {
    const { title, content, isPublished } = req.body

    try {
        const newPost = new Post({
            title,
            content,
            isPublished,
            authorId: req.authorId
        })

        const postSaved = await newPost.save()
        res.json(postSaved)
    } catch (err) {
        res.status(500).json({
            message: err.message || "Something went wrong, please try later"
        })
    }
}

exports.updatePost = async (req, res) => {
    const { id } = req.params
    // Check how to secure this to avoid bambouzleries

    try {
        await Post.findOneAndUpdate(id, req.body)
        res.json({
            message: "Post successfuly updated"
        })
    } catch (err) {
        res.status(500).json({
            message: err.message || "Something went wrong, please try later"
        })
    }
}

exports.deletePost = async (req, res) => {
    const { id } = req.params

    try {
        await Post.findOneAndDelete(id)
        res.json({
            message: "Post successfuly deleted"
        })
    } catch (err) {
        res.status(500).json({
            message: err.message || "Something went wrong, please try later"
        })
    }
}