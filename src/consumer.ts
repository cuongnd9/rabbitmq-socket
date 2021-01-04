import { config, RabbitMQ, RABBITMQ_CONNECTION_STRING, QUEUES } from './components';

const executeConsumer = async () => {
  const rabbitMQ = new RabbitMQ(RABBITMQ_CONNECTION_STRING);
  await rabbitMQ.start();
  const message = await rabbitMQ.consume(QUEUES.task);
  console.log(message.content.toString(), '------------message');
};

export { executeConsumer };
