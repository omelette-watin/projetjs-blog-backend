const Comment = require('../models/Comment')
const Post = require("../models/Post");

exports.findAllComments = async (req, res) => {
    try {
        const comment = await Comment.find()
        res.json(comment)
    } catch (err) {
        res.status(500).json({
            message: err.message || "Something went wrong, please try later"
        })
    }
}

exports.findCommentsByPostId = async (req, res) => {
    const { id } = req.params

    try {
        const comments = await Comment.find({ postId: id })

        if (!comments) return res.status(404).json({
            message: "This post has no comment"
        })

        res.json(comments)
    } catch (err) {
        res.status(500).json({
            message: err.message || "Something went wrong, please try later"
        })
    }
}

exports.findCommentsByUserId = async (req, res) => {
    const { id } = req.params

    try {
        const comments = await Comment.find({ authorId: id })

        if (!comments) return res.status(404).json({
            message: "This user has no comment"
        })

        res.json(comments)
    } catch (err) {
        res.status(500).json({
            message: err.message || "Something went wrong, please try later"
        })
    }
}

exports.createComment = async (req, res) => {
    const { content } = req.body

    try {
        const newComment = new Comment({
            content,
            authorId: req.userId
        })

        const commentSaved = await newComment.save()
        res.json({
            message: "Comment successfuly posted"
        })
    } catch (err) {
        res.status(500).json({
            message: err.message || "Something went wrong, please try later"
        })
    }
}

exports.updateComment = async (req, res) => {
    const { id } = req.params
    // Check how to secure this to avoid bambouzleries

    try {
        const updatedComment = await Comment.findOneAndUpdate(id, { content: req.body.content })
        if (!updatedComment) return res.status(404).json({
            message: "Comment not found"
        })
        res.json({
            message: "Comment successfuly updated"
        })
    } catch (err) {
        res.status(500).json({
            message: err.message || "Something went wrong, please try later"
        })
    }
}

exports.deleteComment = async (req, res) => {
    const { id } = req.params

    try {
        const deletedComment = await Comment.findOneAndDelete(id)
        if (!deletedComment) return res.status(404).json({
            message: "Comment not found"
        })
        res.json({
            message: "Comment successfuly deleted"
        })
    } catch (err) {
        res.status(500).json({
            message: err.message || "Something went wrong, please try later"
        })
    }
}