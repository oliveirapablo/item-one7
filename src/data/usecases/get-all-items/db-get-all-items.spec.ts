import { ItemModel, GetItemModel, AddItemModel, AddItemRepository, ItemInMemoryRepository } from './db-get-all-items-protocols'
import { DbGetAllItems } from './db-get-all-items'
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
    async delete (itemId: string): Promise<void> {
      jest.spyOn(RedisHelper, 'deleteInMemory').mockImplementation()
    }
  }
  return new ItemInMemoryRepositoryStub()
}



const makeItemRepository = (): AddItemRepository => {
  class AddItemRepositoryStub implements AddItemRepository {
    async add (itemData: AddItemModel): Promise<ItemModel> {
      return await new Promise(resolve => resolve(makeFakeItem()))
    }

    async findById (itemData: GetItemModel): Promise<ItemModel> {
      return await new Promise(resolve => resolve(makeFakeItem()))
    }

    async update (itemData: AddItemModel): Promise<ItemModel> {
      return await new Promise(resolve => resolve(makeFakeItem()))
    }
    
    async findAll (): Promise<ItemModel[]> {
      return await new Promise(resolve => resolve([makeFakeItem()]))
    }

  }
  return new AddItemRepositoryStub()
}


interface SutTypes {
  sut: DbGetAllItems
  itemsRepositoryStub: AddItemRepository
  itemRedisRepository: ItemInMemoryRepository
}

const makeSut = (): SutTypes => {
  const itemsRepositoryStub = makeItemRepository()
  const itemRedisRepository = makeItemInMemoryRepository()

  const sut = new DbGetAllItems(itemRedisRepository, itemsRepositoryStub)

  return {
    sut,
    itemRedisRepository,
    itemsRepositoryStub
  }
}

describe('DbGetItem Usecase', () => {
  test('Should call GetItemRepository with correct values', async () => {
    const { sut } = makeSut()

    const item = await sut.findAllItems()

    expect(item).toStrictEqual([makeFakeItem()])
  })

  test('Should throw if AddItemRepository throws', async () => {
    const { sut, itemsRepositoryStub, itemRedisRepository } = makeSut()
    jest.spyOn(itemRedisRepository, 'find')
      .mockReturnValueOnce(new Promise((resolve, reject) => resolve(null)))
    jest.spyOn(itemsRepositoryStub, 'findAll')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.findAllItems()
    await expect(promise).rejects.toThrow('')
  })

  test('If item does not exist in cache, but have in DB', async () => {
    const { sut, itemRedisRepository } = makeSut()

    jest.spyOn(itemRedisRepository, 'find')
      .mockReturnValueOnce(new Promise((resolve, reject) => resolve(null)))

    const item = await sut.findAllItems()
    expect(item).toEqual([makeFakeItem()])
  })
})