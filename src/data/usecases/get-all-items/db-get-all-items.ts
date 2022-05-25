import { ItemModel, GetIAlltems, GetItemModel, AddItemRepository, ItemInMemoryRepository } from './db-get-all-items-protocols'

export class DbGetAllItems implements GetIAlltems {
  private readonly itemRedisRepository: ItemInMemoryRepository
  private readonly itemsRepository: AddItemRepository

  constructor (itemRedisRepository: ItemInMemoryRepository, itemsRepository: AddItemRepository) {
    this.itemRedisRepository = itemRedisRepository
    this.itemsRepository = itemsRepository
  }

  async findAllItems (): Promise<ItemModel[]> {
    // const itemInCache = await this.itemRedisRepository.find('all')
    // if(itemInCache) {
    //   return itemInCache
    // }
    const itemsFouded = await this.itemsRepository.findAll()
    return itemsFouded
  }
}