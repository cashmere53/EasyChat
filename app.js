'use strict'

const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const PORT = process.env.PORT || 3000

const fs = require('fs')
app.get(`/`, (req, res) => {
    // file = fs.readFileSync(__dirname + '/index.html')
    // res.send(file)
    fs.readFile(__dirname + '/index.html', 'utf8', (err, data) => {
        if (err) throw err
        res.send(data)
    })
})

io.on('connection', (socket) => {
    console.log('user connected.')
})

http.listen(PORT, () => {
    console.log(`listen on *:${PORT}`)
})

