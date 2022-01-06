const express = require('express')
const morgan = require('morgan')
const pkg = require('./package.json')
const mongoose = require('./config/database')
const cors = require('cors')

const authRoutes = require("./routes/auth.routes")
const postRoutes = require("./routes/post.routes")
const commentRoutes = require("./routes/comment.routes")
const userRoutes = require("./routes/user.routes")
const reportRoutes = require("./routes/report.routes")

const port = process.env.PORT || 8080

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
server.use(cors({
    origin: '*'
}))

// Routes
server.use('/api/auth', authRoutes)
server.use('/api/posts', postRoutes)
server.use('/api/comments', commentRoutes)
server.use('/api/users', userRoutes)
server.use('/api/reports', reportRoutes)


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