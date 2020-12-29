import { logger, globalOptions } from 'juno-js';

import { config, RabbitMQ } from './components';

globalOptions.environment = config.nodeEnv;

const main = async () => {
  const rabbitMQ = new RabbitMQ(`amqp://${config.rabbitMQHost}:${config.rabbitMQPort}`);
  await rabbitMQ.start();
};

main()
  .catch((e) => logger.error('Global error 🐛', e));
