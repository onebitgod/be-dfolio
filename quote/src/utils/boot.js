import { connectMongoDB, connectRedis } from 'shared';
// import { connectRedis } from './redis.js';

export default async function boot() {
  await connectRedis();
  await connectMongoDB();
  await console.log('Booted successfully');
}
