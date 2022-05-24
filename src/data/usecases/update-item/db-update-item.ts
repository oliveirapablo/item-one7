import { ItemModel, UpdateItem, ItemInMemoryRepository, UpdateItemRepository } from './db-update-item-protocols'

export class DbUpdateItem implements UpdateItem {
  private readonly updateItemRepository: UpdateItemRepository
  private readonly itemInMemoryRepository: ItemInMemoryRepository

  constructor (updateItemRepository: UpdateItemRepository, itemInMemoryRepository: ItemInMemoryRepository) {
    this.updateItemRepository = updateItemRepository
    this.itemInMemoryRepository = itemInMemoryRepository
  }

  async update (itemData: ItemModel): Promise<ItemModel> {
    const item = await this.updateItemRepository.update(itemData)
    await this.itemInMemoryRepository.add(item)
    return item
  }
}