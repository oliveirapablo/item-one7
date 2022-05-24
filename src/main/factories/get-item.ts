import { GetItemController } from '../../presentation/controller/item/get-tem'
import { DbGetItem } from '../../data/usecases/get-item/db-get-item'
import { ItemMongoRepository } from '../../infra/db/mongodb/item-repository/add-item'
export const makeGetItem = (): GetItemController => {
  const itemMongoRepository = new ItemMongoRepository()
  const getItem = new DbGetItem(itemMongoRepository)
  return new GetItemController(getItem)
}
