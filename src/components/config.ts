const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  rabbitMQHost: process.env.RABBITMQ_HOST || 'rabbitmq',
  rabbitMQPort: process.env.RABBITMQ_PORT || '5672',
};

export { config };
