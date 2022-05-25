import { GetAllItemsController } from '../../presentation/controller/item/get-all-items'
import { DbGetAllItems } from '../../data/usecases/get-all-items/db-get-all-items'
import { ItemRedisRepository } from '../../infra/db/redis/item-repository/add-item'
import { ItemMongoRepository } from '../../infra/db/mongodb/item-repository/add-item'

export const makeGetAllItems = (): GetAllItemsController => {
  const itemRedisRepository = new ItemRedisRepository()
  const itemMongoRepository = new ItemMongoRepository()
  const getItem = new DbGetAllItems(itemRedisRepository, itemMongoRepository)
  return new GetAllItemsController(getItem)
}
