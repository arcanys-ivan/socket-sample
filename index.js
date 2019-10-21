const Server = require('socket.io');
const WebSocket = require('ws');
const io = new Server();

var express = require('express');
var app = express();
var http = require('http').createServer(app);

app.use(express.static('client'));
// io.attach(http);


const sampleMessages = [
  'test',
  'test2'
]

var ws = new WebSocket.Server({ server: http });

ws.on('connection', (ws) => {
  console.log(ws);
})


http.listen(3010, function() {
  console.log('listening on *:3000');
});
// io.on('connection', socket => {
//   console.log('socket connected');

//   // socket.on('fetch', () => {
//   //   io.emit('old-messages', sampleMessages);
//   // });

//   // socket.on('user', data => {
//   //   console.log(`user identified as ${data}`)
//   //   socket.join(data);
//   // });

//   // socket.on('private', data => {
//   //   console.log(`private chat to user ${data.userId} from user ${data.from}`);
//   //   io.to(data.userId).emit('chat-message', data.message);
//   // });

//   socket.on('disconnect', () => {
//     // if (socket.customData && socket.customData.name) {
//     //   socket.leave(socket.customData.name);

//     //   io.in(socket.customData.name).clients((err, clients) => {
//     //     console.log(`sockets remaining in ${socket.customData.name}: ${clients}`);
//     //     if (clients.length === 0) {
//     //       io.emit('remove-machine', socket.customData.name);
//     //     }
//     //   });
//     // }
//   });
// });
