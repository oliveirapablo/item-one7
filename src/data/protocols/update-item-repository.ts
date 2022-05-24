import { ItemModel } from '../../domain/models/item'

export interface UpdateItemRepository {
  update (item: ItemModel): Promise<ItemModel>
}