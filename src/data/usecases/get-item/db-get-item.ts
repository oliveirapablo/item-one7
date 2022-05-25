import { ItemModel, GetItemRepository, GetItem, GetItemModel, ItemInMemoryRepository } from './db-get-item-protocols'

export class DbGetItem implements GetItem {
  private readonly itemRedisRepository: ItemInMemoryRepository
  private readonly getItemRepository: GetItemRepository

  constructor (itemRedisRepository: ItemInMemoryRepository, getItemRepository: GetItemRepository) {
    this.itemRedisRepository = itemRedisRepository
    this.getItemRepository = getItemRepository
  }

  async findById (item: GetItemModel): Promise<ItemModel> {
    const itemInCache = await this.itemRedisRepository.find(item.itemId)
    if(itemInCache) {
      return itemInCache
    }
    const itemFouded = await this.getItemRepository.findById(item)
    return itemFouded
  }
}