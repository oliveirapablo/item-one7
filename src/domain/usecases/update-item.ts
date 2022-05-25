import { ItemModel } from "../models/item"

export interface UpdateItem {
  update (item: ItemModel): Promise<ItemModel>
}

export interface UpdateItemTopicModel {
  itemId: string
  name?: string
  description?: string
  category?: string
  quantity: number
  unitaryValue?: number
}

export interface UpdateItemTopic {
  update (item: UpdateItemTopicModel): Promise<ItemModel>
}