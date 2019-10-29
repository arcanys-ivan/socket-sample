
  // Client side Socket.IO object
  var socket = io('http://localhost:3000');
  
  // Creating a new Vue Instance
  let vue = new Vue({
      
      // Adding a root element to our vue app
      el: '#app',

      // Declaring our data object with empty arrays and properties
      data: {
          newMessage: null,
          messages: [],
          typing: false,
          username: null,
          ready: false,
          info: [],
          connections: 0,
          privateMessage: null,
          privateUserId: null,
          myUser: null
      },
      
     
      
      // Our vue created method
      created() {
          
          // Emitting 'leave' event on tab closed event.
          window.onbeforeunload = () => {
              socket.emit('leave', this.username);
          }

          socket.on('error', function(err) {
            throw new Error(err);
          });
          
          // Connection succeeded
          socket.on('success', function(data) {
            console.log(data.message);
            console.log('user info: ' + data.user);
            console.log('logged in: ' + data.user.logged_in)
          })
          
          socket.on('private-message', (data) => {
              console.log(data);
          });

          socket.on('products', (data) => {
              console.log(data)
          })

          socket.on('test-order', (data) => {
            console.log(data)
        })

          // Listening to chat-message event emitted from the server and pushing to messages array
          socket.on('chat-message', (data) => {
              this.messages.push({
                  message: data.message,
                  type: 1,
                  user: data.user,
              });
          });
          
          
          // Listening to typing event emitted from the server and setting the data (username) to the UI
          socket.on('typing', (data) => {
              this.typing = data;
          });

            // Listening to stopTyping event emitted from the server and setting the typing property to false
          socket.on('stopTyping', () => {
              this.typing = false;
          });

            // Listening to 'joined' event emitted from the server and pushing the data to info array
          socket.on('joined', (data) => {
              this.info.push({
                  username: data,
                  type: 'joined'
              });

              // Setting a time out for the info array to be emptied
              setTimeout(() => {
                  this.info = [];
              }, 5000);
          });

          // Listening to 'leave' event emitted from the server and pushing the data to info array
          socket.on('leave', (data) => {
              this.info.push({
                  username: data,
                  type: 'left'
              });
              
              // Setting a time out for the info array to be emptied
              setTimeout(() => {
                  this.info = [];
              }, 5000);
          });

            // Listening to 'connections' event emitted from the server to get the total number of connected clients
          socket.on('connections', (data) => {
            console.log(data)
              this.connections = data;
          });
      },

      // Vue Watch hook
      watch: {
          
          // Watching for changes in the message inbox box and emitting the either 'typing' or 'stopTyping' event
          newMessage(value) {
              value ? socket.emit('typing', this.username) : socket.emit('stopTyping')
          }
      },

      //Vue Methods hook
      methods: {
          
          //The send method stores the user message and emit an event to the server.
          send() {
              this.messages.push({
                  message: this.newMessage,
                  type: 0,
                  user: 'Me',
              });

              socket.emit('chat-message', {
                  message: this.newMessage,
                  user: this.username,
              });
              this.newMessage = null;
          },

          private(message, user) {
            console.log('client::private', message, user);
            this.privateUserId = user;
            socket.emit('private', {
                userId: user,
                currentUser: this.username
            });
          },
    
          sendPrivate() {
              socket.emit('private-chat', {
                  message: this.privateMessage,
                  userId: this.privateUserId,
                  currentUser: this.username
              });
          },

          // The addUser method emit a 'joined' event with the username and set the 'ready' property to true.
          addUser() {
              this.ready = true;
              
              socket.emit('joined', this.username)
          }
      },

  });