const User = require('../models/User')
const jwt = require('jsonwebtoken')

require('dotenv').config()
const SECRET_KEY = process.env.SECRET_KEY

async function userExistByEmail(email) {
    return User.findOne({email})
}

async function userExistByUsername(username) {
    return User.findOne({username})
}

exports.signUp = async (req, res) => {
    const { username, email, password, role } = req.body

    if (await userExistByEmail(email)) return res.status(401).json({
        message: "Email is already used"
    })

    if (await userExistByUsername(username)) return res.status(401).json({
        message: "Username is already used"
    })

    const newUser = new User({
        username,
        email,
        role,
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
    const { email, password, username } = req.body

    const userExist = await userExistByEmail(email) ? await userExistByEmail(email) : await userExistByUsername(username)

    if (!userExist) return res.status(401).json({
        message: "Incorrect email or password"
    })

    const matchPassword = await User.comparePassword(password, userExist.password)

    if (!matchPassword) return res.status(401).json({
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