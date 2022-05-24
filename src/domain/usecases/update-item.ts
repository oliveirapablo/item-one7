import { ItemModel } from '../models/item'

export interface UpdateItem {
  update (item: ItemModel): Promise<ItemModel>
}