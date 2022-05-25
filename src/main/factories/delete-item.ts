import { DeleteItemController } from '../../presentation/controller/item/delete-item'
import { DbDeleteItem } from '../../data/usecases/delete-item/db-delete-item'
import { ItemMongoRepository } from '../../infra/db/mongodb/item-repository/add-item'
import { ItemRedisRepository } from '../../infra/db/redis/item-repository/add-item'
export const makeDeleteItem = (): DeleteItemController => {
  const itemMongoRepository = new ItemMongoRepository()
  const itemRedisRepository = new ItemRedisRepository()
  const deleteItem = new DbDeleteItem(itemMongoRepository, itemRedisRepository)
  return new DeleteItemController(deleteItem)
}
