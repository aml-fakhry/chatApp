import express, { json, urlencoded } from 'express';
import { createServer } from 'http';
import path, { dirname } from 'path';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import cors from 'cors';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5555;
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const httpServer = createServer(app);
const io = new Server(httpServer);

// create a route for the app
app.get('/', (req, res) => {
  res.send('Hello World');
});
app.get('/ejs', (req, res, next) => {
  let msgs = [];
  res.render('index1.ejs', {
    data: req.body,
  });
});
app.get('/send', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
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

// make the server listen to requests
httpServer.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});
