import { AddItemModel } from '../../domain/usecases/add-item'
import { ItemModel } from '../../domain/models/item'
import { GetItemModel } from '../usecases/get-item/db-get-item-protocols'

export interface AddItemRepository {
  add (item: AddItemModel): Promise<ItemModel>
  findById (item: GetItemModel): Promise<ItemModel>
  update (itemData: ItemModel): Promise<ItemModel>
  findAll (): Promise<ItemModel[]>
}

export interface ItemInMemoryRepository{
  add (item: ItemModel): Promise<void>
  find (itemId: string): Promise<ItemModel>
  delete (itemId: string): Promise<void>
}