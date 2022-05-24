import { ItemModel } from '../models/item'

export interface GetItemModel {
  itemId: string
}

export interface GetItem {
  find(item: GetItemModel): Promise<ItemModel>
}