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
    isPublished: {
        type: Boolean,
        required: true,
        default: false,
    },
    authorId: {
        type: String,
        required: true,
        trim: true,
    },
    authorName: {
        type: String,
        required: true,
        trim: true,
    },
    creationDate: {
        type: Date,
        required: true,
        default: now()
    },
    publicationDate: {
        type: Date,
        required: false,
    },
    modificationDate: {
        type: Date,
        required: false,
    },
    views: {
        type: Number,
        required: true,
        default: 0,
    },
    thumbsUp: {
        type: Number,
        required: true,
        default: 0,
    },
    thumbsDown: {
        type: Number,
        required: true,
        default: 0,
    }


})

module.exports = mongoose.model('Post', postSchema)