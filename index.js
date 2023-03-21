const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);
const port = process.env.POTR || 5000;

app.use(cors())


const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    },
});

io.on("connection", (socket) => {
    console.log(`user connected : ${socket.id}`)

    socket.on("send_message", (data) => {
        console.log(data);
        socket.broadcast.emit("received_message", (data))
    })
})

app.get('/', (req, res) => {
    res.send('socket io server running')
})
server.listen(port, () => {
    console.log('server running on port 5000');
})