import mongoose from 'mongoose';

import { config } from '../components';

const connectToMongoDB = async () => {
  const connectionString = `mongodb://${config.mongoUser}:${config.mongoPassword}@${config.mongoHost}:${config.mongoPort}/${config.mongoDatabase}?authSource=admin`;
  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    process.exit(1);
  }
};

export { connectToMongoDB };
