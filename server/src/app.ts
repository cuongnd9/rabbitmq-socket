import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

import { AppController } from './controllers/app.controller';
import { config } from './components';

const executeApp = () => {
  const app = express();
  const server = http.createServer(app);
  const io = new Server(server);

  io.on('connection', AppController.onConnection);
  server.listen(config.port, () => console.log(`🌼 Listening on port ${config.port}`));
};

export { executeApp };
