import { io } from 'socket.io-client'

const socket = io('http://localhost:3000') // Creating  new socket. Now server can connect to port 3000, client -- 8080
socket.on('connect', () => {
    displayMessage(`You connected with id: ${socket.id}!`) // Now we can setup the connection with a client and server!
})
socket.on('receive-message', message => {
    displayMessage(message)
})

/* Choose the name of event what do you want;
    As second argument you can choose what you want --
    -- for me it's a: 10, 'Hi', {a: 'a'} */
//socket.emit('custom-event', 10, 'Hi', {a: 'a'})// For listen events coming down from the server.

const joinRoomButton = document.getElementById('room-button')
const messageInput = document.getElementById('message-input')
const roomInput = document.getElementById('room-input')
const form = document.getElementById('form')

function displayMessage(message) {
    const div = document.createElement('div')
    div.textContent = message
    document.getElementById('message-container').append(div)
}

form.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    const room = roomInput.value
    
    if (message === "") return
    displayMessage(message)
    socket.emit('send-message', message, room)
    
    messageInput.value = ""
})

joinRoomButton.addEventListener('click', () => {
    const room = roomInput.value
    socket.emit('join-room', room, message => {
        displayMessage(message)
    })
})
