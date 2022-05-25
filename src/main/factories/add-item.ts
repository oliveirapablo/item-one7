import { AddItemController } from '../../presentation/controller/item/add-item'
import { DbAddItem } from '../../data/usecases/add-item/db-add-item'
import { ItemMongoRepository } from '../../infra/db/mongodb/item-repository/add-item'
import { ItemRedisRepository } from '../../infra/db/redis/item-repository/add-item'
export const makeAddItem = (): AddItemController => {
  const itemMongoRepository = new ItemMongoRepository()
  const itemRedisRepository = new ItemRedisRepository()
  const getItem = new DbAddItem(itemMongoRepository, itemRedisRepository)
  return new AddItemController(getItem)
}
