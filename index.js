const Server = require('socket.io')
const WebSocket = require('ws');
const io = new Server();

var express = require('express');
var app = express();
var http = require('http').createServer(app);

app.use(express.static('client'));
// io.set('transports', ['websockets']);
io.attach(http);


const sampleMessages = [
  'test',
  'test2'
]

// var ws = new WebSocket.Server({ server: http });

// ws.on('connection', (connection) => {
//   console.log('connected');

//   connection.onmessage = (e) => {
//     console.log(e.data);
//   }
// })



http.listen(3010, function() {
  console.log('listening on *:3000');
});

io.on('connection', (socket) => {

  socket.emit('connections', Object.keys(io.sockets.connected).length);

  socket.on('disconnect', () => {
      console.log("A user disconnected");
  });

  socket.on('chat-message', (data) => {
      socket.broadcast.emit('chat-message', (data));
  });

  socket.on('typing', (data) => {
      socket.broadcast.emit('typing', (data));
  });

  socket.on('stopTyping', () => {
      socket.broadcast.emit('stopTyping');
  });

  socket.on('joined', (data) => {
      socket.broadcast.emit('joined', (data));
  });

  socket.on('leave', (data) => {
      socket.broadcast.emit('leave', (data));
  });

});