import express from 'express';
import http from 'http';
import { Socket, Server } from 'socket.io';
import cors from 'cors';

import { AppController } from './controllers/app.controller';
import { config, checkRole } from './components';

const app = express();
// FIXME: define origin url.
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: config.originUrl,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

const executeApp = () => {
  io
    .use(checkRole('uw_staff'))
    .on('connection', (socket: Socket) => AppController.onConnection(socket));
  server.listen(config.port, () => console.log(`🌼 Listening on port ${config.port}`));
};

export { executeApp, io };
