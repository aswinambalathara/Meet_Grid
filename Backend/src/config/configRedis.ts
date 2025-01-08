import { createClient } from "redis";
import { REDIS_HOST, REDIS_PASS, REDIS_PORT } from "./env";

export const redisClient = createClient({
  username: "default",
  password: REDIS_PASS,
  socket: {
    host: REDIS_HOST,
    port: Number(REDIS_PORT),
    reconnectStrategy: (retries: number, cause: Error) => {
      if (retries > 5) {
        console.error("Max reconnect attempts reached. Stopping reconnection.");
        return false; 
      }
      const delay = Math.min(retries * 1000, 5000);
      console.log(`Reconnecting to Redis in ${delay} ms due to: ${cause.message}`);
      return delay;
    },
  },
});

// Function to connect with retry logic
const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log("Redis connected");
    return; 
  } catch (error) {
    console.error("error connecting redis", error);
  }
};


redisClient.on("error", (err) => {
  console.error("Redis Client Error:", err);
});

redisClient.on("reconnecting", (delay) => {
  console.log(`Reconnecting to Redis in ${delay} ms...`);
});


process.on("SIGINT", async () => {
  console.log("SIGINT received. Closing Redis connection...");
  await redisClient.quit();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("SIGTERM received. Closing Redis connection...");
  await redisClient.quit();
  process.exit(0);
});
 

export default connectRedis;
