const User = require("../models/User")
const jwt = require("jsonwebtoken")

require("dotenv").config()
const SECRET_KEY = process.env.SECRET_KEY

const userExistByEmail = async (email) => {
  return User.findOne({ email: email })
}

const userExistByUsername = async (username) => {
  return User.findOne({ username: username })
}

exports.signUp = async (req, res) => {
  try {
    const { username, email, password, role } = req.body

    if (!email || !username || !password)
      return res.status(400).json({
        message: "All fields are required",
      })

    if (!email.includes("@"))
      return res.status(400).json({
        message: "L'adresse e-mail est invalide",
      })

    if (await userExistByEmail(email))
      return res.status(401).json({
        message: "L'adresse e-mail est déjà utilisée",
      })

    if (await userExistByUsername(username))
      return res.status(401).json({
        message: "Le nom d'utilisateur est déjà utilisée",
      })

    const newUser = new User({
      username,
      email,
      role: role || "reader",
      password: await User.hashPassword(password),
    })

    const savedUser = await newUser.save()

    const token = jwt.sign(
      { id: savedUser._id },
      SECRET_KEY,
      { expiresIn: 604800 } // 1 week
    )

    res.status(200).json({
      message: "User successfuly created",
      token,
    })
  } catch (err) {
    res.status(500).json({
      message: err.message || "Something went wrong, please try later",
    })
  }
}

exports.logIn = async (req, res) => {
  try {
    const { password, username } = req.body

    if (!username || !password)
      return res.status(400).json({
        message: "Veuillez remplir tous les champs",
      })
    const userExist = (await userExistByEmail(username))
      ? await userExistByEmail(username)
      : await userExistByUsername(username)

    if (!userExist)
      return res.status(401).json({
        message: "Identifiants invalides",
      })

    const matchPassword = await User.comparePassword(
      password,
      userExist.password
    )

    if (!matchPassword)
      return res.status(401).json({
        message: "Identifiants invalides",
      })

    const token = jwt.sign(
      { id: userExist._id },
      SECRET_KEY,
      { expiresIn: 604800 } // 1 week
    )

    return res.status(200).json({
      _id: userExist._id,
      message: "Successfuly logged in",
      token: token,
    })
  } catch (err) {
    res.status(500).json({
      message: err.message || "Something went wrong, please try later",
    })
  }
}

exports.verifyToken = async (req, res) => {
  const token = req.headers["x-access-token"]

  try {
    if (!token) return res.json(null)

    const userId = jwt.verify(token, SECRET_KEY).id

    const user = await User.findById(userId).select({ password: 0 })

    if (!user) return res.json(null)

    return res.json(user)
  } catch (err) {
    res.status(500).json({
      message: err.message || "Something went wrong, please try later",
    })
  }
}
