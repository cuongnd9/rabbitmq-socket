const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  rabbitmqHost: process.env.RABBITMQ_HOST || 'rabbitmq',
};

export { config };
