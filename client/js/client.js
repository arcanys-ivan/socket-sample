// WS Native
// var socket = new WebSocket('ws://localhost:3000');
// var socket = new WebSocket('ws://127.0.0.1:3000/socket.io/?EIO=3&transport=websocket');

// socket.onopen = function(event) {
//   console.log('Connection established');

//   setInterval(function() {
//     socket.send(JSON.stringify({message: 'message'}));
//   }, 3000);

//   // socket.onmessage = function(e) {
//   //   console.log('from server', e);
//   // }
// }



// socket.onclose = function(event) {
//   console.log('close', event);
// }

// SOCKETIO
const socket = io('http://localhost:3000');


socket.on('connect', () => {
  console.log('connected');
  
  socket.emit('identity', '2ogn-huwe-x8i9-sav1a');

});

socket.on('ping', () => {
  console.log('ping')
})

socket.on('identity', (message) => {
  console.log(message)
})

socket.on('disconnect', (m) => {
  console.log('disconnected', m)
})
