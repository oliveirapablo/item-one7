import { ItemModel, UpdateItemRepository, ItemInMemoryRepository } from './db-update-item-protocols'
import { DbUpdateItem } from './db-update-item'
import { RedisHelper } from '../../../infra/db/redis/helpers/redis-helper'

const makeFakeItem = (): ItemModel => ({
  itemId: 'valid_itemId',
  name: 'valide_name',
  description: 'valid_description',
  category: 'valid_category',
  quantity: 99,
  unitaryValue: 80.99,
  lastUpdate: new Date('2022-05-23T10:39:03.451Z'),
})

const makeFakeItemData = (): ItemModel => ({
  itemId: 'valid_itemId',
  name: 'valide_name',
  description: 'valid_description',
  category: 'valid_category',
  quantity: 99,
  unitaryValue: 80.99,
})

const makeUpdateItemRepository = (): UpdateItemRepository => {
  class UpdateItemRepositoryStub implements UpdateItemRepository {
    async update (itemData: ItemModel): Promise<ItemModel> {
      return await new Promise(resolve => resolve(makeFakeItem()))
    }
  }
  return new UpdateItemRepositoryStub()
}

const makeItemInMemoryRepository = (): ItemInMemoryRepository => {
  class ItemInMemoryRepositoryStub implements ItemInMemoryRepository {
    async add (item: ItemModel): Promise<void> {
      jest.spyOn(RedisHelper, 'setInMemory').mockImplementation()        
    }
    async find(itemId: string): Promise<ItemModel> {
      return makeFakeItem()
    }
  }
  return new ItemInMemoryRepositoryStub()
}

interface SutTypes {
  sut: DbUpdateItem
  updateItemRepositoryStub: UpdateItemRepository
  itemInMemoryRepository: ItemInMemoryRepository
}

const makeSut = (): SutTypes => {
  const updateItemRepositoryStub = makeUpdateItemRepository()
  const itemInMemoryRepository = makeItemInMemoryRepository()

  const sut = new DbUpdateItem(updateItemRepositoryStub, itemInMemoryRepository)

  return {
    sut,
    updateItemRepositoryStub,
    itemInMemoryRepository
  }
}

describe('DbUpdateItem Usecase', () => {
  test('Should call UpdateItemRepository with correct values', async () => {
    const { sut, updateItemRepositoryStub } = makeSut()
    const updateSpy = jest.spyOn(updateItemRepositoryStub, 'update')

    await sut.update(makeFakeItemData())

    expect(updateSpy).toHaveBeenCalledWith(makeFakeItemData())
  })

  test('Should throw if UpdateItemRepository throws', async () => {
    const { sut, updateItemRepositoryStub } = makeSut()
    jest.spyOn(updateItemRepositoryStub, 'update')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.update(makeFakeItemData())
    await expect(promise).rejects.toThrow('')
  })

  test('Should an Item In Memory on success', async () => {
    const { sut } = makeSut()
    const item = await sut.update(makeFakeItemData())
    expect(item).toEqual(makeFakeItem())
  })

  test('Should throw if ItemInMemoryRepository throws', async () => {
    const { sut, itemInMemoryRepository } = makeSut()
    jest.spyOn(itemInMemoryRepository, 'add')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.update(makeFakeItemData())
    await expect(promise).rejects.toThrow('')
  })

})