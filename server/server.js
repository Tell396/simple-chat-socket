const { instrument } = require("@socket.io/admin-ui");

const io = require("socket.io")(3000, {
  cors: {
    origin: ["http://localhost:8080", "https://admin.socket.io"],
  },
}); // Declare a variable using socket.io and port 3000.

io.on("connection", socket => {
  //console.log(socket.id)
  /* socket.on("custom-event", (number, string, obj) => { // Listen and hear parameters from the client
        console.log(number, string, obj)
    }) */

  socket.on("send-message", (message, room) => {
    if (room === "") {
      socket.broadcast.emit("receive-message", message); // Receive message to other client. // Use socket.broadcast for send to every other socket isn"t me.
    } else {
      socket.to(room).emit("receive-message", message);
    }
  });

  socket.on("join-room", (room, cb) => {
    // We say the server, what we join to the room
    socket.join(room);
    cb(`Joined to ${room}`);
  });
});

instrument(io, { auth: false });
