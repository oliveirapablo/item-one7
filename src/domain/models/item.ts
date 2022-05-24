export interface ItemModel {
  itemId: string
  name: string
  description?: string
  category?: string
  quantity: number
  unitaryValue: number
  lastUpdate?: Date
}

export interface ItemsModel {
  items: ItemsModel[]
}
