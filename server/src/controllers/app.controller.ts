import { Socket } from 'socket.io';

import { logger } from 'juno-js';
import {
  config, RabbitMQ, EVENT, TASK_STATUS, RABBITMQ_CONNECTION_STRING, QUEUE,
} from '../components';
import { CustomerServiceUser, Task } from '../types/app.type';

class AppController {
  private static customerServiceUsers: CustomerServiceUser[] = [];
  private static mapId: Map<string, string> = new Map();

  static onConnection(socket: Socket) {
    socket.on(EVENT.userConnection,(user: CustomerServiceUser, socket: Socket) => AppController.onUserConnection(user, socket));
    socket.on(EVENT.taskHandler, (user: CustomerServiceUser, result: Task) => AppController.onTaskHandler(user, result, socket));
    socket.on(EVENT.userDisconnection,(() => AppController.onUserDisconnection(socket)));
    socket.on(EVENT.userCloseTab, AppController.onUserCloseTab);
  }

  private static onUserConnection(user: CustomerServiceUser, socket: Socket) {
    AppController.customerServiceUsers.push(user);
    AppController.mapId.set(user.socketId, user.id!);
    console.log('----------Connection-------------------');
    console.log(AppController.customerServiceUsers);
    AppController.onSubscriber(socket);
  }

  private static onUserDisconnection(socket: Socket) {
    AppController.customerServiceUsers = AppController.customerServiceUsers.filter(user => user.id !== AppController.mapId.get(socket.id));
    AppController.mapId.delete(socket.id);
    console.log('----------------Disconnect------------------');
    console.log(AppController.customerServiceUsers);
  }

  private static async onTaskHandler(user: CustomerServiceUser, result: Task, socket: Socket) {
    const rabbitMQ = new RabbitMQ(RABBITMQ_CONNECTION_STRING);
    await rabbitMQ.start();
    AppController.customerServiceUsers = AppController.changeStatusUser(AppController.customerServiceUsers, user);
    if (result.status === 'faile') {
      let priority = result?.count! + 1;
      const dataRetry = {
          ...result,
          text: Math.floor(Math.random() * Math.floor(10)),
      };
      await rabbitMQ.publishInQueue(QUEUE.newTask, Buffer.from(JSON.stringify(dataRetry)), priority)
      await rabbitMQ.consume(QUEUE.newTask);
    } else {
      const queueInfo = await rabbitMQ.getQueueInfo();
      // if queue have message or have CS available then create consume to get message
      if (queueInfo.messageCount > 0 || AppController.haveUserConnect(AppController.customerServiceUsers)) {
        AppController.onSubscriber(socket);
      } else {
        console.log('Task Done');
      }
    }
  }

  private static async onUserCloseTab(user: CustomerServiceUser, result: Task) {
    const rabbitMQ = new RabbitMQ(RABBITMQ_CONNECTION_STRING);
    await rabbitMQ.start();
    let priority = result.count! + 1;
    await rabbitMQ.publishInQueue(QUEUE.newTask, Buffer.from(JSON.stringify(result)), priority);
  }

  private static async onSubscriber(socket?: Socket) {
    const rabbitMQ = new RabbitMQ(RABBITMQ_CONNECTION_STRING);
    await rabbitMQ.start();
    await rabbitMQ.assertQueue();
    if (socket) {
      socket.on(EVENT.userDisconnection, async () => {
        await rabbitMQ.closeChannel();
      });
    }
    const message = await rabbitMQ.consume(QUEUE.newTask);
    logger.info(message.content.toString(), '------------message');
  }

  public static randomId(customerServiceUsers: CustomerServiceUser[]): string {
    const userReady = customerServiceUsers.filter(user => user.status === 'ready');
    if (userReady.length <= 0) return '';
    const random = Math.floor(Math.random() * Math.floor(userReady.length));
    return userReady[random].socketId;
  }

  public static checkAssign(customerServiceUsers: CustomerServiceUser[], id: string) {
    return customerServiceUsers.filter(user => (user.status === 'ready' && user.id === id)).length > 0;
  }

  public static changeStatusUser (customerServiceUsers: CustomerServiceUser[], data: CustomerServiceUser): CustomerServiceUser[] {
    return customerServiceUsers.map(user => {
        if (user.id === AppController.mapId.get(data.socketId)) {
            user = {
                ...user,
                status: data.status,
            };
            return user;
        }
        return user;
    });
  }

  public static haveUserConnect(customerServiceUsers: CustomerServiceUser[]) {
    return customerServiceUsers.filter(user => user.status === 'ready').length > 0;
  }

  public static getCustomerServiceUsers(): CustomerServiceUser[] {
    return AppController.customerServiceUsers;
  }

  public static setCustomerServiceUsers(customerServiceUsers: CustomerServiceUser[]) {
    AppController.customerServiceUsers = customerServiceUsers;
  }

  public static getMapId(): Map<string, string> {
    return AppController.mapId;
  }

  public static setMapId(mapId: Map<string, string>) {
    AppController.mapId = mapId;
  }
}

export { AppController };
