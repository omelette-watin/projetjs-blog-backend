const mongoose = require('mongoose')

const dbPrefix = process.env.DB_PREFIX || 'mongodb:/'
const dbUsername = process.env.DB_USERNAME || ''
const dbPassword = process.env.DB_PASSWORD || ''
const dbAdress = process.env.DB_ADDRESS || '/localhost/blog'

const mongoDb = dbPrefix + dbUsername + dbPassword + dbAdress

mongoose.connect(mongoDb)
mongoose.Promise = global.Promise

module.exports = mongoose