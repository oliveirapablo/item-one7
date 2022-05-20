export interface ItemModel {
  itemId: string
  name: string
  description?: string
  category?: string
  quantity: number
  unitaryValue: string
  lastUpdate: Date
}

export interface ItemsModel {
  items: ItemsModel[]
}

export interface BalanceItemsModel {
  amount: number
}