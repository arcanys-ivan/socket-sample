var socket = new WebSocket('ws://127.0.0.1:3010');

socket.onopen = function(event) {
  console.log('Connection established');
}