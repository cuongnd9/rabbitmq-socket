/* eslint-disable require-await */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-empty-function */
import {
  Connection, Channel, connect, Message,
} from 'amqplib';
import { QUEUE, EVENT } from './constants';
import { io } from '../app';
import { AppController } from '../controllers/app.controller';

class RabbitMQ {
  private conn: Connection;

  private channel: Channel;

  constructor(private uri: string) {}

  async start(): Promise<void> {
    this.conn = await connect(this.uri);
    this.channel = await this.conn.createChannel();
  }

  async assertQueue(): Promise<void> {
    await this.channel.assertQueue(QUEUE.newTask, {
      durable: false,
      maxPriority: 100,
    });
  }

  async publishInQueue(queue: string, message: any, priority?: number) {
    await this.channel.sendToQueue(queue, Buffer.from(message), { priority });
  }

  async publishInExchange(
    exchange: string,
    routingKey: string,
    message: string
  ): Promise<boolean> {
    return this.channel.publish(exchange, routingKey, Buffer.from(message));
  }

  async consume(queue: string): Promise<Message> {
    return new Promise<Message>(((resolve) => {
      this.channel.consume(queue, async (message: any) => {
        const randomSocketId = AppController.randomId(AppController.getCustomerServiceUsers());
        let users = AppController.getCustomerServiceUsers();
        const userId = AppController.getMapId().get(randomSocketId) || '';
        if (AppController.checkAssign(users, userId)) {
          const content = JSON.parse(message.content.toString());
          io.to(randomSocketId).emit(EVENT.taskAssignment, content);
          resolve(message);
          users = AppController.changeStatusUser(users, { socketId: randomSocketId, status: 'inprocess' });
          AppController.setCustomerServiceUsers(users);
          this.channel.ack(message);
          this.closeChannel();
        }
      }, {
        noAck: false,
      });
    }));
  }

  async getQueueInfo(): Promise<any> {
    return this.channel.checkQueue(QUEUE.newTask);
  }

  async closeChannel() {
    await this.channel.close();
  }
}

export { RabbitMQ };
