const socket = io();

document.addEventListener('DOMContentLoaded', () => {
    const username = prompt('Enter your username:');
    socket.emit('register', username);

    const messageForm = document.getElementById('messageForm');
    const messageInput = document.getElementById('messageInput');
    const messages = document.getElementById('messages');
    const userList = document.getElementById('userList');

    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = messageInput.value;
        socket.emit('sendMessage', message);
        messageInput.value = '';
    });

    socket.on('updateUserList', (users) => {
        userList.innerHTML = 'Online Users: ' + users.join(', ');
    });

    socket.on('newMessage', (message) => {
        const messageElement = document.createElement('div');
        messageElement.textContent = `${message.user}: ${message.text}`;
        messages.appendChild(messageElement);
        messages.scrollTop = messages.scrollHeight;
    });
});
