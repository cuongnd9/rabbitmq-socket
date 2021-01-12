import { logger, globalOptions } from 'juno-js';

import { config } from './components';
import { connectToMongoDB } from './models';
import { executeApp } from './app';

globalOptions.environment = config.nodeEnv;

const main = async () => {
  try {
    await connectToMongoDB();
    executeApp();
  } catch (e) {
    logger.error('Global error 🐛', e);
  }
};

main();
