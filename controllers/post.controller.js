const Post = require('../models/Post')

exports.findAllPublishedPosts = async (req, res) => {
    try {
        const posts = await Post.find({ isPublished: true })
        res.json(posts)
    } catch (err) {
        res.status(500).json({
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

        res.json(post)
    } catch (err) {
        res.status(500).json({
            message: err.message || "Something went wrong, please try later"
        })
    }
}

exports.findPublishedPostsByUserId = async (req, res) => {
    const { id } = req.params

    try {
        const posts = await Post.find({ authorId: id, isPublished: true })

        if (!posts) return res.status(404).json({
            message: "This user has no posts"
        })

        res.json(posts)
    } catch (err) {
        res.status(500).json({
            message: err.message || "Something went wrong, please try later"
        })
    }
}

exports.findSavedPostsByUserId = async (req, res) => {
    const { id } = req.params

    try {
        const posts = await Post.find({ authorId: id, isPublished: false })

        if (!posts) return res.status(404).json({
            message: "This user has no posts"
        })

        res.json(posts)
    } catch (err) {
        res.status(500).json({
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

exports.publishPost = async (req, res) => {
    const { id } = req.params

    try {
        const post = await Post.findById(id);

        if (!post) return res.status(404).json({
            message: "This user has no posts"
        })

        const publishedPost = Post.updateOne({ _id: id }, { isPublished: true })

        res.json(publishedPost)
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
        const updatedPost = await Post.findOneAndUpdate(id, req.body)
        if (!updatedPost) return res.status(404).json({
            message: "Post not found"
        })
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
        const deletedPost = await Post.findOneAndDelete(id)
        if (!deletedPost) return res.status(404).json({
            message: "Post not found"
        })
        res.json({
            message: "Post successfuly deleted"
        })
    } catch (err) {
        res.status(500).json({
            message: err.message || "Something went wrong, please try later"
        })
    }
}