import { ItemModel, GetItemModel, GetItemRepository, ItemInMemoryRepository } from './db-get-item-protocols'
import { DbGetItem } from './db-get-item'
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

const makeFakeItemData = (): GetItemModel => ({
  itemId: 'valid_itemId',
})

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



const makeGetItemRepository = (): GetItemRepository => {
  class GetItemRepositoryStub implements GetItemRepository {
    async findById (itemData: GetItemModel): Promise<ItemModel> {
      return await new Promise(resolve => resolve(makeFakeItem()))
    }
  }
  return new GetItemRepositoryStub()
}


interface SutTypes {
  sut: DbGetItem
  getItemRepositoryStub: GetItemRepository
  itemRedisRepository: ItemInMemoryRepository
}

const makeSut = (): SutTypes => {
  const getItemRepositoryStub = makeGetItemRepository()
  const itemRedisRepository = makeItemInMemoryRepository()

  const sut = new DbGetItem(itemRedisRepository, getItemRepositoryStub)

  return {
    sut,
    itemRedisRepository,
    getItemRepositoryStub
  }
}

describe('DbGetItem Usecase', () => {
  test('Should call GetItemRepository with correct values', async () => {
    const { sut } = makeSut()

    const item = await sut.findById(makeFakeItemData())

    expect(item).toStrictEqual(makeFakeItem())
  })

  test('Should throw if AddItemRepository throws', async () => {
    const { sut, getItemRepositoryStub, itemRedisRepository } = makeSut()
    jest.spyOn(itemRedisRepository, 'find')
      .mockReturnValueOnce(new Promise((resolve, reject) => resolve(null)))
    jest.spyOn(getItemRepositoryStub, 'findById')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.findById(makeFakeItemData())
    await expect(promise).rejects.toThrow('')
  })

  test('If item does not exist in cache, but have in DB', async () => {
    const { sut, itemRedisRepository } = makeSut()

    jest.spyOn(itemRedisRepository, 'find')
      .mockReturnValueOnce(new Promise((resolve, reject) => resolve(null)))

    const item = await sut.findById(makeFakeItemData())
    expect(item).toEqual(makeFakeItem())
  })
})