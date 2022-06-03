const io = require('socket.io')(3000, {
    cors: {
        origin: ['http://localhost:8080'],
    },
}) // Declare a variable using socket.io and port 3000.

io.on('connection', socket => {
    console.log(socket.id)
})