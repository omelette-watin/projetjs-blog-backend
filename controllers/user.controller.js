const User = require('../models/User')
const Post = require("../models/Post");
const Comment = require("../models/Comment");

const userExistByEmail= async (email) => {
    return User.exists({email})
}

const userExistByUsername = async (username) => {
    return User.exists({username})
}

exports.countAllUsers = async (req, res) => {
    try {
        const numberUsers = await User.countDocuments({})
        res.json(numberUsers)
    }  catch (err) {
        res.status(500).json({
            message: err.message || "Something went wrong, please try later"
        })
    }
}

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

exports.findAllReaders = async (req, res) => {
    try {
        const users = await User.find({ role: "reader" }).select({ password: 0})
        res.json(users)
    }  catch (err) {
        res.status(500).json({
            message: err.message || "Something went wrong, please try later"
        })
    }
}

exports.findAllAuthors = async (req, res) => {
    try {
        const users = await User.find({ role: "author" }).select({ password: 0})
        res.json(users)
    }  catch (err) {
        res.status(500).json({
            message: err.message || "Something went wrong, please try later"
        })
    }
}

exports.findAllAdmins = async (req, res) => {
    try {
        const users = await User.find({ role: "admin" }).select({ password: 0})
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

exports.updateUser = async (req, res) => {
    const { id } = req.params
    const { username, email, password } = req.body

    try {

        const user = await User.findById(id)

        if (!user) return res.status(404).json({
            message: "User not found"
        })

        if (email && !email.includes("@")) return res.status(400).json({
            message: "Email is invalid"
        })

        if (await userExistByEmail(email) && user.email !== email) return res.status(401).json({
            message: "Email already used"
        })

        if (await userExistByUsername(username) && user.username !== username) return res.status(401).json({
            message: "Username already used"
        })

        await User.updateOne(
            { _id: id },
            {
                email: email || user.email,
                password: password ? await User.hashPassword(password) : user.password,
                username: username || user.username
            }
        )

        res.json({
            message: "User successfuly updated"
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