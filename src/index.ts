import { logger, globalOptions } from 'juno-js';

import { config } from './components';

globalOptions.environment = config.nodeEnv;

const main = async () => {
  
};

main()
  .catch((e) => logger.error('Global error 🐛', e));
