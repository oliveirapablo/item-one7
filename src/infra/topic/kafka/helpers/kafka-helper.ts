import { Kafka } from 'kafkajs'
import { UpdateItemTopicModel } from '../../../../domain/usecases/update-item'
import { makeUpdateItemTopic } from '../../../../main/factories/update-item'

export const KafkaHelper = {
  client: typeof Kafka,
  uri: null as string,
  consumer: typeof Kafka,
  async connect (kafkaConfig: any): Promise<void> {
    this.uri = kafkaConfig.uri
    this.client = new Kafka({
      clientId: kafkaConfig.consumer,
      brokers: [this.uri],
    })
    this.consumer = this.client.consumer({groupId: 'consumer-group'})
  },

  async consumerUpdateItem (topic: string) {
    await this.consumer.connect()

    await this.consumer.subscribe({ topic })

    const updateItemTopicFactory = makeUpdateItemTopic()

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message}) => {
        const itemParsed = (JSON.parse(message.value)) as UpdateItemTopicModel
        const result = await updateItemTopicFactory.update(itemParsed)
        console.log("Item updated from Topic")
        console.log(result)
      }
    })
  }
}
