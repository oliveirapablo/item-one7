import { ItemModel, AddItemRepository, AddItem, AddItemModel, ItemInMemoryRepository } from './db-add-item-protocols'

export class DbAddItem implements AddItem {
  private readonly addItemRepository: AddItemRepository
  private readonly itemInMemoryRepository: ItemInMemoryRepository

  constructor (addItemRepository: AddItemRepository, itemInMemoryRepository: ItemInMemoryRepository) {
    this.addItemRepository = addItemRepository
    this.itemInMemoryRepository = itemInMemoryRepository
  }

  async add (itemData: AddItemModel): Promise<ItemModel> {
    const item = await this.addItemRepository.add(itemData)
    await this.itemInMemoryRepository.add(item)
    return item
  }
}