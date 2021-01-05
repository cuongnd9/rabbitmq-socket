import { logger} from 'juno-js';

import { config, RabbitMQ, RABBITMQ_CONNECTION_STRING, QUEUES } from './components';

const executeConsumer = async () => {
  const rabbitMQ = new RabbitMQ(RABBITMQ_CONNECTION_STRING);
  await rabbitMQ.start();
  const message = await rabbitMQ.consume(QUEUES.newTask);
  logger.info(message.content.toString(), '------------message');
};

export { executeConsumer };
