import express from 'express';
import http from 'http';
import { Socket, Server } from 'socket.io';

import { config } from './components';

const executeApp = () => {
  const app = express();
  app.get('/', () => '🦄');

  const server = http.createServer(app);

  const io = new Server(server);

  let interval: any;

  io.on("connection", (socket: Socket) => {
    console.log("New client connected");
    if (interval) {
      clearInterval(interval);
    }
    interval = setInterval(() => getApiAndEmit(socket), 1000);
    socket.on("disconnect", () => {
      console.log("Client disconnected");
      clearInterval(interval);
    });
  });

  const getApiAndEmit = (socket: Socket) => {
    const response = new Date();
    // Emitting a new message. Will be consumed by the client
    socket.emit("FromAPI", response);
  };

  server.listen(config.port, () => console.log(`🌼 Listening on port ${config.port}`));
};

export { executeApp };
