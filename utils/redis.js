import redis from 'redis';
import promisify from 'util'
import { util } from 'chai';

class RedisClient {
    constructor() {
        this.client = createClient();
        this.isClientConnected = true;
        this.client.on('error', (err) => {
          console.error('Redis client failed to connect:', err.message || err.toString());
          this.isClientConnected = false;
        });
        this.client.on('connect', () => {
          this.isClientConnected = true;
        });
      }

  // Check if the connection to Redis is successful
  isAlive() {
    return this.client.connected;
  }

  // Get the value stored for a given key
  async get(key) {
    return promisify(this.client.GET)
      .bind(this.client)(key);
  }

  // Set a key-value pair with an expiration duration in seconds
  async set(key, value, duration) {
    await promisify(this.client.SETEX)
      .bind(this.client)(key, duration, value);
  }

  // Delete a key and its associated value from Redis
  async del(key) {
    await promisify(this.client.DEL)
      .bind(this.client)(key);
  }
}

// Create and export an instance of RedisClient
const redisClient = new RedisClient();
export default redisClient;
