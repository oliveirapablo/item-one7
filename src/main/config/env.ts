export default {
  mongoUrl: process.env.MONGO_URL ? process.env.MONGO_URL : process.env.MONGO_URL_ONE7,
  redisUrl: process.env.REDIS_URL,
  redisPassword: process.env.REDIS_PASSWORD,
  port: process.env.PORT ? process.env.PORT : process.env.PORT_ONE7_ITEM
}