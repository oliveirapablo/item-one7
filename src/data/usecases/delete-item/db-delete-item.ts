import { DeleteItemRepository, DeleteItem, DeleteItemModel, ItemInMemoryRepository } from './db-delete-item-protocols'

export class DbDeleteItem implements DeleteItem {
  private readonly deleteItemRepository: DeleteItemRepository
  private readonly itemInMemoryRepository: ItemInMemoryRepository

  constructor (deleteItemRepository: DeleteItemRepository, itemInMemoryRepository: ItemInMemoryRepository) {
    this.deleteItemRepository = deleteItemRepository
    this.itemInMemoryRepository = itemInMemoryRepository
  }

  async delete (itemData: DeleteItemModel): Promise<void> {
    await this.deleteItemRepository.delete(itemData)
    await this.itemInMemoryRepository.delete(itemData.itemId)
  }
}