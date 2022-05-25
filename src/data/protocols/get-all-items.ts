import { ItemModel } from '../../domain/models/item'

export interface GetItemAllItemsRepository {
  findAllItems (): Promise<ItemModel[]>
}