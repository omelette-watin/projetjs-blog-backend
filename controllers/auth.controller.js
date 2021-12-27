const User = require('../models/User')
const jwt = require('jsonwebtoken')

require('dotenv').config()
const SECRET_KEY = process.env.SECRET_KEY

exports.signUp = async (req, res) => {
    const { username, email, password } = req.body

    const newUser = new User({
        username,
        email,
        password: await User.hashPassword(password)
    })

    const savedUser = await newUser.save()

    const token = jwt.sign(
        { id: savedUser._id },
        SECRET_KEY,
        { expiresIn: 604800 } // 1 week
    )

    res.status(200).json({
        message: "User successfuly created",
        token
    })
}

exports.logIn = async (req, res) => {
    const { email, password } = req.body

    const userExist = await User.findOne({ email: email })

    const matchPassword = await User.comparePassword(userExist.password, password)

    if (!userExist || !matchPassword) return res.status(401).json({
        message: "Incorrect email or password"
    })
    
    const token = jwt.sign(
        { id: userExist._id },
        SECRET_KEY,
        { expiresIn: 604800 } // 1 week
    )
    
    return res.status(200).json({
        _id: userExist._id,
        message: 'Successfuly logged in',
        token: token,
    })

}