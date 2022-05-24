require('dotenv').config()
import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper'
import { RedisHelper } from '../infra/db/redis/helpers/redis-helper'
import { KafkaHelper } from '../infra/topic/kafka/helpers/kafka-helper'
import env from './config/env'

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
  })
  .catch(console.error)

RedisHelper.connect(env.redisUrl, env.redisPassword).then(async () => {
  console.log("Redis connected")
}).catch(console.error)

KafkaHelper.connect(env.kafkaConfig).then(() => {
  console.log('Kafka connected')
  KafkaHelper.consumerUpdateItem(env.kafkaConfig.topics.updateItem)
}).catch(console.error)