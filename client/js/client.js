var socket = new WebSocket('ws://127.0.0.1:3010/socket.io/?EIO=3&transport=websocket');

socket.onopen = function(event) {
  console.log('Connection established');
}