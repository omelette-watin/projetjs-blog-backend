const mongoose = require('mongoose')

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
    }
})


module.exports = mongoose.model('Report', reportSchema)