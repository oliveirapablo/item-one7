import { AddItemModel } from '../../domain/usecases/add-item'
import { ItemModel } from '../../domain/models/item'

export interface AddItemRepository {
  add (item: AddItemModel): Promise<ItemModel>
}

export interface ItemInMemoryRepository{
  add (item: ItemModel): Promise<void>
  find (itemId: string): Promise<ItemModel>
}