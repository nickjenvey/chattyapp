const express = require('express');
const SocketServer = require('ws').Server;

// Require uuid and set it to V4
const uuidv4 = require('uuid/v4');

// Require randomcolor
const randomColor = require('randomcolor');

const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  wss.clients.forEach(function each(client) {
    if (client.readyState === ws.OPEN) {
      let users = {
        type: "users",
        color: randomColor(),
        numberOfUsers: wss.clients.size
      }
      client.send(JSON.stringify(users));
    }
  });

  ws.on('message', function incoming(data) {
    // Turn the recieved string back into an object
    let postData = JSON.parse(data);

    // Set an id to that object
    postData.id = uuidv4();

    switch(postData.type) {
      case "postMessage": 

        // Changed type to incomingMessage
        postData.type = "incomingMessage"

        // Check if the username is empty, if so set it to Anonymous
        if (!postData.username) {
          postData.username = "Anonymous";
        }
        break;
      
      case "postNotification":
        // Changed type to incomingNotification
        postData.type = "incomingNotification"
    }

    wss.clients.forEach(function each(client) {
      if (client.readyState === ws.OPEN) {
        // Re-stringify the object so it can be sent back
        client.send(JSON.stringify(postData));
      }
    });
  });
  
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});