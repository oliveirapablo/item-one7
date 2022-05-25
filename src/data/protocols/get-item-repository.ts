import { GetItemModel } from '../../domain/usecases/get-item'
import { ItemModel } from '../../domain/models/item'

export interface GetItemRepository {
  findById (item: GetItemModel): Promise<ItemModel>
}