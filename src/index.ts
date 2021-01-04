import { logger, globalOptions } from 'juno-js';

import { config, RabbitMQ, rabbitMQConnectionString } from './components';

globalOptions.environment = config.nodeEnv;

const main = async () => {
  try {
    const rabbitMQ = new RabbitMQ(rabbitMQConnectionString);
    await rabbitMQ.start();
  } catch (e) {
    logger.error('Global error 🐛', e);
  }
};

main();
