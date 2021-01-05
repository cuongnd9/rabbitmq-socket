import { config } from './config';

export const RABBITMQ_CONNECTION_STRING = `amqp://${config.rabbitMQUser}:${config.rabbitMQPassword}@${config.rabbitMQHost}:${config.rabbitMQPort}`;

export const QUEUES = {
  newTask: 'NEW_TASK',
};
