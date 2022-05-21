import { ItemModel } from '../models/item'

export interface AddItemModel {
  name: string
  description?: string
  category?: string
  quantity: number
  unitaryValue: string
  // lastUpdate: Date
}

export interface AddItem {
  add(item: AddItemModel): Promise<ItemModel>
}