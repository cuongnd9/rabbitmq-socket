import { Socket } from 'socket.io';

import { logger } from 'juno-js';
import {
  config, RabbitMQ, EVENT, TASK_STATUS, RABBITMQ_CONNECTION_STRING, QUEUE,
} from '../components';
import { CustomerServiceUser } from '../types/app.type';

class AppController {
  private static customerServiceUsers: CustomerServiceUser[] = [];

  static onConnection(socket: Socket) {
    socket.on(EVENT.userConnection, this.onUserConnection);
    socket.on(EVENT.taskHandler, this.onTaskHandler);
    socket.on(EVENT.userDisconnection, this.onUserDisconnection);
    socket.on('disconnect', this.onDisconnect);
  }

  private static onUserConnection(user: { id: string; socketId: string }) {

  }

  private static onUserDisconnection() {

  }

  private static onTaskHandler() {

  }

  private static onTaskAssignment() {

  }

  private static onDisconnect() {

  }

  private static async onSubscriber(socket?: Socket) {
    const rabbitMQ = new RabbitMQ(RABBITMQ_CONNECTION_STRING);
    await rabbitMQ.start();

    if (socket) {
      socket.on('disconnect', async () => {
        await rabbitMQ.closeChannel();
      });
    }

    const message = await rabbitMQ.consume(QUEUE.newTask);
    logger.info(message.content.toString(), '------------message');
  }
}

export { AppController };
