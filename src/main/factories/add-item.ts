import { AddItemController } from '../../presentation/controller/item/add-item'
import { DbAddItem } from '../../data/usecases/add-item/db-add-item'
import { ItemMongoRepository } from '../../infra/db/mongodb/item-repository/add-item'
export const makeAddItem = (): AddItemController => {
  const transactionMongoRepository = new ItemMongoRepository()
  const addTransaction = new DbAddItem(transactionMongoRepository)
  return new AddItemController(addTransaction)
}
