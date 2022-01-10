const mongoose = require('mongoose')

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
    },
    modificationDate: {
        type: Date,
        required: false,
    }
})

module.exports = mongoose.model('Comment', commentSchema)