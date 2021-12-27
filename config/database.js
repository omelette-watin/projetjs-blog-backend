const mongoose = require('mongoose')

require('dotenv').config()
const mongoDb = process.env.DB || 'mongodb://localhost/blog'

mongoose.connect(mongoDb)
mongoose.Promise = global.Promise

module.exports = mongoose