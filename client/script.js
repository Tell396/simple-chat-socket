import { io } from 'socket.io-client'

const socket = io('http://localhost:3000') // Creating  new socket. Now server can connect to port 8080
socket.on('connect', () => {
    displayMessage(`You connected with id: ${socket.id}!`) // Now we can setup the connection with a client and server!
})

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

    messageInput.value = ""
})

joinRoomButton.addEventListener('click', () => {
    const room = roomInput.value
})
