type Port = number | undefined;

const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 1234,
  mongoHost: process.env.MONGO_HOST || 'mongodb',
  mongoPort: (process.env.MONGO_PORT as Port) || 27017,
  mongoUser: process.env.MONGO_USER || 'mongodb',
  mongoPassword: process.env.MONGO_PASSWORD || 'mongodb',
  mongoDatabase: process.env.MONGO_DATABASE || 'mongodb',
  rabbitMQHost: process.env.RABBITMQ_HOST || 'rabbitmq',
  rabbitMQPort: process.env.RABBITMQ_PORT || '5672',
  rabbitMQUser: process.env.RABBITMQ_USER || 'rabbitmq',
  rabbitMQPassword: process.env.RABBITMQ_PASSWORD || 'rabbitmq',
};

export { config };
