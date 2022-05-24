import { UpdateItemController } from '../../presentation/controller/item/update-item'
import { DbUpdateItem } from '../../data/usecases/update-item/db-update-item'
import { DbUpdateItemTopic } from '../../data/usecases/update-item-topic/db-update-item-topic'
import { ItemMongoRepository } from '../../infra/db/mongodb/item-repository/add-item'
import { ItemRedisRepository } from '../../infra/db/redis/item-repository/add-item'
export const makeUpdateItem = (): UpdateItemController => {
  const itemMongoRepository = new ItemMongoRepository()
  const itemRedisRepository = new ItemRedisRepository()
  const updateItem = new DbUpdateItem(itemMongoRepository, itemRedisRepository)
  return new UpdateItemController(updateItem)
}

export const makeUpdateItemTopic = (): DbUpdateItemTopic => {
  const itemMongoRepository = new ItemMongoRepository()
  const itemRedisRepository = new ItemRedisRepository()
  const updateItemTopic = new DbUpdateItemTopic(itemMongoRepository, itemRedisRepository)
  return updateItemTopic
}