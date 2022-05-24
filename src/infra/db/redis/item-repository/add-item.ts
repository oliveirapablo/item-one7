import { ItemInMemoryRepository } from '../../../../data/protocols/add-item-repository'
import { ItemModel } from '../../../../presentation/protocols'
import { RedisHelper } from '../helpers/redis-helper'

export class ItemRedisRepository implements ItemInMemoryRepository {
  async add (itemData: ItemModel): Promise<void> {
    const { itemId } = itemData
    await RedisHelper.setInMemory(`itemId:${itemId}`, itemData)  
  }

  async find (itemId: string): Promise<ItemModel> {
    const itemInCache = RedisHelper.getInMemory(`itemId:${itemId}`)
    return itemInCache
  }
}