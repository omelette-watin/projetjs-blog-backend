const express = require('express')
const morgan = require('morgan')
const pkg = require('./package.json')

require('dotenv').config()
const port = process.env.PORT || 3001

const server = express()

// Settings
server.set('pkg', pkg)

// Middlewares
server.use(morgan('dev'))
server.use(express.json())
server.use(express.urlencoded({ extended: false })) // What does it do ?

// Routes

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