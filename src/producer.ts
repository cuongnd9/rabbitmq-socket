import { config, RabbitMQ, RABBITMQ_CONNECTION_STRING, QUEUES } from './components';

const executeProducer = async () => {
  const rabbitMQ = new RabbitMQ(RABBITMQ_CONNECTION_STRING);
  await rabbitMQ.start();
  await rabbitMQ.publishInQueue(QUEUES.task, 'Hello world');
};

export { executeProducer };
