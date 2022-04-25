import express from 'express';
import { createServer } from 'http';
import path, { dirname } from 'path';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';

/* This function ensures the correct decodings of percent-encoded characters as well as ensuring a cross-platform valid absolute path string. */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/* Creates an Express application. */
const app = express();

/* Setup socket server. */
const httpServer = createServer(app);
const io = new Server(httpServer);

// create a route for the app
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '/views/index.html'));
});

app.get('/room', (_req, res) => {
  res.sendFile(path.join(__dirname, '/views/room.html'));
});

let clients = new Map();
io.on('connection', (socket) => {
  console.log('new user connected');
  console.log(socket.client.conn.server.clientsCount + ' users connected');
  socket.once('name', (name) => {
    clients.set(name, socket);
  });

  socket.on('chat message', (msg) => {
    let toSocket = clients.get(msg.to);
    toSocket.emit('chat message', msg.text);
  });

  socket.on('typing', function (data) {
    // send an event to everyone but the person who emitted the typing event to the server
    socket.broadcast.emit('typing', data);
  });

  socket.on('noTyping', function (data) {
    // send an event to everyone but the person who emitted the typing event to the server
    socket.broadcast.emit('noTyping', data);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
    socket.emit('message', 'user disconnected');
  });
});

/* make the server listen to requests */
httpServer.listen(process.env.PORT || 5555, () => {
  console.log(
    `Server running at: http://localhost:${process.env.PORT || 5555}/`
  );
});
