import { ItemModel, AddItemRepository, AddItem, AddItemModel } from './db-add-item-protocols'

export class DbAddItem implements AddItem {
  private readonly addItemRepository: AddItemRepository

  constructor (addItemRepository: AddItemRepository) {
    this.addItemRepository = addItemRepository
  }

  async add (itemData: AddItemModel): Promise<ItemModel> {
    const item = await this.addItemRepository.add(itemData)
    return item
  }
}