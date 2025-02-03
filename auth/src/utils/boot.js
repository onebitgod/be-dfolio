import { connectMongoDB, connectRedis, logger } from 'shared';

export default async function boot() {
  await connectRedis();
  await connectMongoDB();
  console.log('Booted successfully');
}
