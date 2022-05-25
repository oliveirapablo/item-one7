import { ItemModel } from '../models/item'

export interface GetItemModel {
  itemId: string
}

export interface GetItem {
  findById(item: GetItemModel): Promise<ItemModel>
}