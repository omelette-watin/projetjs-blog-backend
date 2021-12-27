const mongoose = require('mongoose')
const { now } = require('mongoose')

// Post Schema
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    publicationDate: {
        type: Date,
        required: true,
        default: now()
    },
    isPublished: {
        type: Boolean,
        required: true,
        default: false,
    },
    authorId: {
        type: String,
        required: true,
        trim: true,
    }
})

module.exports = mongoose.model('Post', postSchema)