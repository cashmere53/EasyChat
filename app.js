'use strict'

require('date-utils')

const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/../index.html')
})

io.on('connection', (socket) => {
    console.log('a user connected')
    socket.on('chat message', (msg) => {
        var dt = new Date()
        var formatted = dt.toFormat("YYYY/MM/DD HH24:MI:SS")
        var str = 'message[' + formatted +'] ' + msg
        console.log(str)
        io.emit('chat message', str)
    });
});

http.listen(PORT, () => {
    console.log('dirname: ' + __dirname)
    console.log(`listening on *:${PORT}`)
})
