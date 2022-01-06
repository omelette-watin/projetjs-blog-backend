const mongoose = require('mongoose')
const { now } = require('mongoose')

const reportSchema  = new mongoose.Schema({
    grade: {
        type: Number,
        required: true,
        trim: true,
    },
    message: {
        type: String,
        required: false,
        trim: true,
    },
    publicationDate: {
        type: Date,
        required: true,
        default: now(),
    }
})


module.exports = mongoose.model('Report', reportSchema)