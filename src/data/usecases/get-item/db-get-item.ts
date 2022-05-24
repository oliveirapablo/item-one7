import { ItemModel, GetItemRepository, GetItem, GetItemModel } from './db-get-item-protocols'

export class DbGetItem implements GetItem {
  private readonly getItemRepository: GetItemRepository

  constructor (getItemRepository: GetItemRepository) {
    this.getItemRepository = getItemRepository
  }

  async findById (item: GetItemModel): Promise<ItemModel> {
    const itemFouded = await this.getItemRepository.findById(item)
    return itemFouded
  }
}