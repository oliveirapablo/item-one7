import { ItemModel, UpdateItemTopicModel, UpdateItemTopic, ItemInMemoryRepository, AddItemRepository } from './db-update-item-topic-protocols'

export class DbUpdateItemTopic implements UpdateItemTopic {
  private readonly updateItemRepository: AddItemRepository
  private readonly itemInMemoryRepository: ItemInMemoryRepository

  constructor (updateItemRepository: AddItemRepository, itemInMemoryRepository: ItemInMemoryRepository) {
    this.updateItemRepository = updateItemRepository
    this.itemInMemoryRepository = itemInMemoryRepository
  }

  async update (itemData: UpdateItemTopicModel): Promise<ItemModel> {
    const item = await this.updateItemRepository.findById(itemData)
    item.quantity = item.quantity - itemData.quantity
    const itemUpdated = await this.updateItemRepository.update(item)
    await this.itemInMemoryRepository.add(itemUpdated)
    return itemUpdated
  }
}