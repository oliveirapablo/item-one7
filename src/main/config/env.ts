export default {
  mongoUrl: process.env.MONGO_URL ? process.env.MONGO_URL : process.env.MONGO_URL_ONE7,
  redisUrl: process.env.REDIS_URL,
  redisPassword: process.env.REDIS_PASSWORD,
  port: process.env.PORT ? process.env.PORT : process.env.PORT_ONE7_ITEM,
  kafkaConfig: {
    uri: process.env.KAFKA_URL,
    consumer: process.env.KAFKA_CLIENT_CONSUMSER,
    topics: {
      updateItem: process.env.KAFKA_TOPIC_UPDATE_ITEMS
    }
  }
}