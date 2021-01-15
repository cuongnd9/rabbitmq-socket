import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

import { AppController } from './controllers/app.controller';
import { config } from './components';

const app = express();
const server = http.createServer(app);
const io = new Server(server, { 
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
}});

const executeApp = () => {
  io.on('connection', AppController.onConnection);
  server.listen(config.port, () => console.log(`🌼 Listening on port ${config.port}`));
};

export { executeApp, io };

