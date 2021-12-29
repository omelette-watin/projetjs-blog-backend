const User = require('../models/User')
const Post = require("../models/Post");
const Comment = require("../models/Comment");

exports.findAllUsers = async (req, res) => {
    try {
        const users = await User.find().select({ password: 0})
        res.json(users)
    }  catch (err) {
        res.status(500).json({
            message: err.message || "Something went wrong, please try later"
        })
    }
}

exports.findOneUserById = async (req, res) => {
    const { id } = req.params

    try {
        const user = await Post.findById(id).select({ password: 0})

        if (!user) return res.status(404).json({
            message: "Post not found"
        })

        res.json(user)
    } catch (err) {
        res.status(500).json({
            message: err.message || "Something went wrong, please try later"
        })
    }
}

exports.grantUserAuthorRole = async (req, res) => {
    const { id } = req.params

    try {
        const user = await User.findOneAndUpdate(
            { _id: id},
            { role: 'author'}
        )

        if (!user) return res.status(404).json({
            message: "User not found"
        })

        res.json({
            message: "User successfuly granted author role"
        })
    } catch (err) {
        res.status(500).json({
            message: err.message || "Something went wrong, please try later"
        })
    }
}

exports.grantUserAdminRole = async (req, res) => {
    const { id } = req.params

    try {
        const user = await User.findOneAndUpdate(
            { _id: id },
            { role: 'admin'}
        )

        if (!user) return res.status(404).json({
            message: "User not found"
        })

        res.json({
            message: "User successfuly granted admin role"
        })
    } catch (err) {
        res.status(500).json({
            message: err.message || "Something went wrong, please try later"
        })
    }
}


exports.deleteUser = async (req, res) => {
    const { id } = req.params

    try {
        const deletedUser = await User.findOneAndDelete({ _id: id})
        if (!deletedUser) return res.status(404).json({
            message: "User not found"
        })
        await Comment.deleteMany({ authorId: id })
        await Post.deleteMany({ authorId: id })
        res.json({
            message: "User successfuly deleted"
        })
    } catch (err) {
        res.status(500).json({
            message: err.message || "Something went wrong, please try later"
        })
    }
}

exports.deactivateUser = async (req, res) => {
    const { id } = req.params

    try {
        const user = await User.findOneAndUpdate({ _id: id }, { isActive: false })

        if (!user) return res.status(404).json({
            message: "User not found"
        })

        res.json({
            message: "User successfuly deactivated"
        })
    } catch (err) {
        res.status(500).json({
            message: err.message || "Something went wrong, please try later"
        })
    }
}

exports.activateUser = async (req, res) => {
    const { id } = req.params

    try {
        const user = await User.findOneAndUpdate({ _id: id }, { isActive: true })

        if (!user) return res.status(404).json({
            message: "User not found"
        })

        res.json({
            message: "User successfuly activated"
        })
    } catch (err) {
        res.status(500).json({
            message: err.message || "Something went wrong, please try later"
        })
    }
}