import express from 'express';
import http from 'http';
import { Socket, Server } from 'socket.io';
import { name } from 'faker';

import { config } from './components';

const executeApp = () => {
  const app = express();
  app.get('/', () => '🦄');

  const server = http.createServer(app);

  const io = new Server(server);

  io.on("connection", (socket: Socket) => {
    console.log("New client connected");
    socket.emit('TOPIC', name.title())
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

  server.listen(config.port, () => console.log(`🌼 Listening on port ${config.port}`));
};

export { executeApp };
