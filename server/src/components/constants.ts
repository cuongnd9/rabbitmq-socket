import { config } from './config';

export const RABBITMQ_CONNECTION_STRING = `amqp://${config.rabbitMQUser}:${config.rabbitMQPassword}@${config.rabbitMQHost}:${config.rabbitMQPort}`;

export const QUEUE = {
  newTask: 'NEW_TASK',
};

export const EVENT = {
  userConnection: 'USER_CONNECTION',
  userDisconnection: 'disconnect',
  taskHandler: 'TASK_HANDLER',
  taskAssignment: 'TASK_ASSIGNMENT',
  userCloseTab: 'USER_CLOSE_TAB',
};

export const TASK_STATUS = {
  todo: 'TODO',
  inProcess: 'IN_PROCESS',
  retry: 'RETRY',
  failed: 'FAILED',
  done: 'DONE',
};
