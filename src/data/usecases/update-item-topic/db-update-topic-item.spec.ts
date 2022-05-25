import { UpdateItemTopicModel, UpdateItemTopic, ItemModel, UpdateItemRepository, AddItemRepository, ItemInMemoryRepository } from './db-update-item-topic-protocols'
import { DbUpdateItemTopic } from './db-update-item-topic'
import { RedisHelper } from '../../../infra/db/redis/helpers/redis-helper'
import { AddItemModel } from '../add-item/db-add-item-protocols'
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

const makeFakeItemData = (): ItemModel => ({
  itemId: 'valid_itemId',
  name: 'valide_name',
  description: 'valid_description',
  category: 'valid_category',
  quantity: 99,
  unitaryValue: 80.99,
  
})

const makeUpdateItemRepository = (): AddItemRepository => {
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
  sut: UpdateItemTopic
  updateItemRepositoryStub: AddItemRepository
  itemInMemoryRepository: ItemInMemoryRepository
}

const makeSut = (): SutTypes => {
  const updateItemRepositoryStub = makeUpdateItemRepository()
  const itemInMemoryRepository = makeItemInMemoryRepository()

  const sut = new DbUpdateItemTopic(updateItemRepositoryStub, itemInMemoryRepository)

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
    const updatedItem = {
      itemId: 'valid_itemId',
      name: 'valide_name',
      description: 'valid_description',
      category: 'valid_category',
      quantity: 0,
      unitaryValue: 80.99,
      lastUpdate: new Date('2022-05-23T10:39:03.451Z')
    }
    await sut.update(makeFakeItemData())

    expect(updateSpy).toHaveBeenCalledWith(updatedItem)
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