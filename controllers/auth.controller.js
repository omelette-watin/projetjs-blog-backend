const User = require('../models/User')
const jwt = require('jsonwebtoken')

require('dotenv').config()
const SECRET_KEY = process.env.SECRET_KEY

const userExistByEmail= async (email) => {
    return User.findOne({email})
}

const userExistByUsername = async (username) => {
    return User.findOne({username})
}

exports.signUp = async (req, res) => {
    try {
        const {username, email, password, role} = req.body

        if (!email || !username || !password) return res.status(400).json({
            message: "All fields are required"
        })

        if (!email.includes("@")) return res.status(400).json({
            message: "Email is invalid"
        })

        if (await userExistByEmail(email)) return res.status(401).json({
            message: "Email already used"
        })

        if (await userExistByUsername(username)) return res.status(401).json({
            message: "Username already used"
        })

        const newUser = new User({
            username,
            email,
            role,
            password: await User.hashPassword(password)
        })

        const savedUser = await newUser.save()

        const token = jwt.sign(
            {id: savedUser._id},
            SECRET_KEY,
            {expiresIn: 604800} // 1 week
        )

        res.status(200).json({
            message: "User successfuly created",
            token
        })
    }  catch (err) {
        res.status(500).json({
            message: err.message || "Something went wrong, please try later"
        })
    }
}

exports.logIn = async (req, res) => {
    try {
        const {email, password, username} = req.body

        if ((!email && !username) || !password) return res.status(400).json({
            message: "All fields are required"
        })

        const userExist = await userExistByEmail(email) ? await userExistByEmail(email) : await userExistByUsername(username)

        if (!userExist) return res.status(401).json({
            message: "Incorrect email or password"
        })

        const matchPassword = await User.comparePassword(password, userExist.password)

        if (!matchPassword) return res.status(401).json({
            message: "Incorrect email or password"
        })

        const token = jwt.sign(
            {id: userExist._id},
            SECRET_KEY,
            {expiresIn: 604800} // 1 week
        )

        return res.status(200).json({
            _id: userExist._id,
            message: 'Successfuly logged in',
            token: token,
        })
    }  catch (err) {
        res.status(500).json({
            message: err.message || "Something went wrong, please try later"
        })
    }
}