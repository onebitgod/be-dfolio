import { connectRedis } from './redis.js';

export default async function boot() {
  await connectRedis();
  console.log('Booted successfully');
}
