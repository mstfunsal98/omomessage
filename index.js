const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const users = {};

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('register', (username) => {
        users[socket.id] = username;
        io.emit('updateUserList', Object.values(users));
    });

    socket.on('sendMessage', (message) => {
        io.emit('newMessage', { user: users[socket.id], text: message });
    });

    socket.on('disconnect', () => {
        delete users[socket.id];
        io.emit('updateUserList', Object.values(users));
        console.log('Client disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
