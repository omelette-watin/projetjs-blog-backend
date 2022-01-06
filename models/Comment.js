const mongoose = require('mongoose')
const { now } = require('mongoose')

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        trim: true,
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
    postId: {
        type: String,
        required: true,
        trim: true,
    },
    publicationDate: {
        type: Date,
        required: true,
        default: now()
    },
    modificationDate: {
        type: Date,
        required: false,
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

module.exports = mongoose.model('Comment', commentSchema)