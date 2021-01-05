const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 9000,
  rabbitMQHost: process.env.RABBITMQ_HOST || 'rabbitmq',
  rabbitMQPort: process.env.RABBITMQ_PORT || '5672',
  rabbitMQUser: process.env.RABBITMQ_USER || 'rabbitmq',
  rabbitMQPassword: process.env.RABBITMQ_PASSWORD || 'rabbitmq',
};

export { config };
