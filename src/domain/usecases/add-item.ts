import { ItemModel } from '../models/item'

export interface AddItemModel {
  name: string
  description?: string
  category?: string
  quantity: number
  unitaryValue: number
}

export interface AddItem {
  add(item: AddItemModel): Promise<ItemModel>
}