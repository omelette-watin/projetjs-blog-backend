const express = require('express')
const morgan = require('morgan')
const pkg = require('./package.json')
const mongoose = require('./config/database')

const authRoutes = require("./routes/auth.routes")

require('dotenv').config()
const port = process.env.PORT || 3001

const server = express()

// DB settings
mongoose.connection.on(
    "error",
    console.error.bind(console, "DB Connection Error")
)

// Settings
server.set('pkg', pkg)

// Middlewares
server.use(morgan('dev'))
server.use(express.json())
server.use(express.urlencoded({ extended: false })) // What does it do ?

// Routes
server.use('/api/auth', authRoutes)

// Infos Route
server.get("/", (req, res) => {
    res.json({
        name: server.get("pkg").name,
        version: server.get("pkg").version,
        authors: server.get("pkg").author,
        description: server.get("pkg").description,
    })
})

server.listen(port, (err) => {
    if (err) throw err
    console.log(`Listening on port : ${port}...`)
})