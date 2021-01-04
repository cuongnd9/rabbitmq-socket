import { config } from './config';

export const rabbitMQConnectionString = `amqp://${config.rabbitMQUser}:${config.rabbitMQPassword}@${config.rabbitMQHost}:${config.rabbitMQPort}`;
