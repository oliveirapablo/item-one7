import { ItemModel, AddItemModel, AddItemRepository, ItemInMemoryRepository } from './db-add-item-protocols'
import { DbAddItem } from './db-add-item'
import { RedisHelper } from '../../../infra/db/redis/helpers/redis-helper'
import { GetItemModel } from '../get-item/db-get-item-protocols'

const makeFakeItem = (): ItemModel => ({
  itemId: 'valid_itemId',
  name: 'valide_name',
  description: 'valid_description',
  category: 'valid_category',
  quantity: 99,
  unitaryValue: 80.99,
  lastUpdate: new Date('2022-05-23T10:39:03.451Z'),
})

const makeFakeItemData = (): AddItemModel => ({
  name: 'valid_name',
  description: 'valid_description',
  category: 'valid_category',
  quantity: 99,
  unitaryValue: 80.99

})

const makeAddItemRepository = (): AddItemRepository => {
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
  }
  return new AddItemRepositoryStub()
}

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

interface SutTypes {
  sut: DbAddItem
  addItemRepositoryStub: AddItemRepository
  itemInMemoryRepository: ItemInMemoryRepository
}

const makeSut = (): SutTypes => {
  const addItemRepositoryStub = makeAddItemRepository()
  const itemInMemoryRepository = makeItemInMemoryRepository()

  const sut = new DbAddItem(addItemRepositoryStub, itemInMemoryRepository)

  return {
    sut,
    addItemRepositoryStub,
    itemInMemoryRepository
  }
}

describe('DbAddItem Usecase', () => {
  test('Should call AddItemRepository with correct values', async () => {
    const { sut, addItemRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addItemRepositoryStub, 'add')

    await sut.add(makeFakeItemData())

    expect(addSpy).toHaveBeenCalledWith(makeFakeItemData())
  })

  test('Should throw if AddItemRepository throws', async () => {
    const { sut, addItemRepositoryStub } = makeSut()
    jest.spyOn(addItemRepositoryStub, 'add')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.add(makeFakeItemData())
    await expect(promise).rejects.toThrow('')
  })

  test('Should an Item In Memory on success', async () => {
    const { sut } = makeSut()
    const item = await sut.add(makeFakeItemData())
    expect(item).toEqual(makeFakeItem())
  })

  test('Should throw if ItemInMemoryRepository throws', async () => {
    const { sut, itemInMemoryRepository } = makeSut()
    jest.spyOn(itemInMemoryRepository, 'add')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.add(makeFakeItemData())
    await expect(promise).rejects.toThrow('')
  })

})