import { logger, globalOptions } from 'juno-js';

import { config } from './components';
import { executeApp } from './app';
import { executeConsumer } from './consumer';
import { executeProducer } from './producer';

globalOptions.environment = config.nodeEnv;

const main = () => {
  try {
    executeApp();
    executeProducer();
    executeConsumer();
  } catch (e) {
    logger.error('Global error 🐛', e);
  }
};

main();
