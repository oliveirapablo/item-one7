import { GetItemController } from '../../presentation/controller/item/get-tem'
import { DbGetItem } from '../../data/usecases/get-item/db-get-item'
import { ItemRedisRepository } from '../../infra/db/redis/item-repository/add-item'
import { ItemMongoRepository } from '../../infra/db/mongodb/item-repository/add-item'

export const makeGetItem = (): GetItemController => {
  const itemRedisRepository = new ItemRedisRepository()
  const itemMongoRepository = new ItemMongoRepository()
  const getItem = new DbGetItem(itemRedisRepository, itemMongoRepository)
  return new GetItemController(getItem)
}
