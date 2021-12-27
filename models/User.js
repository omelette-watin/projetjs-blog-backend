const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// User Schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        required: true,
        trim: true,
        default: "reader",
    }
})

// Hash password
userSchema.statics.hashPassword = async (password) => {
    const salt1 = await bcrypt.genSalt(10)
    const salt2 = await bcrypt.genSalt(10)
    return await bcrypt.hash(salt1, password, salt2)
}

// Compare password
userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
}

// Export User Model
module.exports = mongoose.model('User', userSchema)