const jwt = require('jsonwebtoken')
const User = require('../models/User')

require('dotenv').config()
const SECRET_KEY = process.env.SECRET_KEY

exports.canChangeRights = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"]
        const { id } = req.params

        if (!token) return res.status(403).json({
            message: "No token provided"
        })

        const userId = jwt.verify(token, SECRET_KEY).id

        const user = await User.findById(userId)
        const toBeModifiedUser = await User.findById(id)

        if (user.role !== 'admin' && toBeModifiedUser.role !== 'admin') res.status(401).json({
            message: "Unauthorized"
        })

        next()
    } catch (err) {
        res.status(500).json({
            message: err.message || "Something went wrong, please try later"
        })
    }
}

exports.canDeleteThisUser = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"]
        const { id } = req.params

        if (!token) return res.status(403).json({
            message: "No token provided"
        })

        const userId = jwt.verify(token, SECRET_KEY).id

        const user = await User.findById(userId)
        const toBeDeletedUser = await User.findById(id)

        if (!toBeDeletedUser) return res.status(404).json({
            message: "User not found"
        })

        if (!(toBeDeletedUser.id === userId || (user.role === 'admin' && toBeDeletedUser.role !== 'admin'))) return res.status(401).json({
            message: "Unauthorized"
        })

        next()
    }  catch (err) {
        res.status(500).json({
            message: err.message || "Something went wrong, please try later"
        })
    }
}