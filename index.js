const Server = require('socket.io')
// const WebSocket = require('ws');
const io = new Server();

var express = require('express');
var app = express();
var http = require('http').createServer(app);

app.use(express.static('client'));
io.attach(http);

app.post('/socket', function (request, response) {
  Object.keys(io.sockets.connected).forEach(id => {
    const socket = io.sockets.connected[id];

    socket.emit('test-socket', {test: true});
  });

  response.status(200).send({
    success: true
  })
});

app.post('/orders', function (request, response) {
  Object.keys(io.sockets.connected).forEach(id => {
    const socket = io.sockets.connected[id];

    socket.emit('test-order', {testOrder: true});
  });

  response.status(200).send({
    success: true
  })
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});

// var ws = new WebSocket.Server({ server: http });

// ws.on('connection', (connection) => {
//   console.log('connected');



//   connection.onmessage = (e) => {
//     console.log(e.data);

//     connection.send('test');
//   }
// });

// io.on('connection', (socket) => {
//   console.log('connected');

//   socket.on('chat-message', (data) => {
//     console.log('from client', data);
//   });

//   socket.on('identity', (data) => {
//     console.log('identity', data);
//   })


// socket.on('disconnect', (socket) => {
//   console.log('disconnected', socket);
// })
// });

// io.on('disconnect', (socket) => {
//   console.log('disconnected', socket);
// })

const users = [];


io.on('connection', (socket) => {

  socket.emit('connections', Object.keys(io.sockets.connected).length);

  socket.on('test-socket', (data) => {
    console.log('test socket', data);
  });

  socket.on('disconnect', () => {
      console.log("A user disconnected");
  });

  socket.on('private', (data) => {
    console.log('initiate private for', data);
    const user = users.find(u => u.userId == data.userId);
    const current = users.find(u => u.userId == data.currentUser);

    console.log(io.sockets.adapter.rooms)

    Object.keys(io.sockets.connected).forEach(id => {
      const socket = io.sockets.connected[id];
      // console.log('id', so)
      // if (so.id === user.id) {
      //   so.join(`${data.userId}-${data.currentUser}`);
      // }

      if (id === user.id) {
        socket.join(`${data.userId}-${data.currentUser}`);
      }
    });

    // Norman-Ivan
    // Test-Ivan
    socket.join(`${data.userId}-${data.currentUser}`);
  });

  socket.on('private-chat', (data) => {
    console.log('private-chat to', data);
    const user = users.find(u => u.userId == data.userId);
    const current = users.find(u => u.userId == data.currentUser);

    io.to(`${data.userId}-${data.currentUser}`).emit('private-message', {message: data.message});
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

  socket.on('joined', (userId) => {
      socket.broadcast.emit('joined', (userId));

      users.push({
        userId,
        id: socket.id
      });
  });

  socket.on('leave', (data) => {
      socket.broadcast.emit('leave', (data));
  });

});