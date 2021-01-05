/* eslint-disable require-await */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-empty-function */
import {
  Connection, Channel, connect, Message,
} from 'amqplib';

class RabbitMQ {
  private conn: Connection;

  private channel: Channel;

  constructor(private uri: string) {}

  async start(): Promise<void> {
    this.conn = await connect(this.uri);
    this.channel = await this.conn.createChannel();
  }

  async publishInQueue(queue: string, message: string) {
    await this.channel.assertQueue(queue, {
      durable: false,
    });
    return this.channel.sendToQueue(queue, Buffer.from(message));
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
      this.channel.consume(queue, (message) => {
        if (message) {
          resolve(message);
          this.channel.ack(message);
        }
      });
    }));
  }
}

export { RabbitMQ };
