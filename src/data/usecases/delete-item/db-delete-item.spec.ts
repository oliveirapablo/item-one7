import { DeleteItemModel, DeleteItemRepository, ItemInMemoryRepository, ItemModel } from './db-delete-item-protocols'
import { DbDeleteItem } from './db-delete-item'
import { RedisHelper } from '../../../infra/db/redis/helpers/redis-helper'

const makeFakeItemData = (): DeleteItemModel => ({
  itemId: 'valid_itemId',
})
const makeFakeItem = (): ItemModel => ({
  itemId: 'valid_itemId',
  name: 'valide_name',
  description: 'valid_description',
  category: 'valid_category',
  quantity: 99,
  unitaryValue: 80.99,
  lastUpdate: new Date('2022-05-23T10:39:03.451Z'),
})

const makeDeleteItemRepository = (): DeleteItemRepository => {
  class DeleteItemRepositoryStub implements DeleteItemRepository {
    async delete (itemData: DeleteItemModel): Promise<void> {
      jest.fn().mockImplementationOnce(() => Promise.resolve())
    }
  }
  return new DeleteItemRepositoryStub()
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
  sut: DbDeleteItem
  deleteItemRepositoryStub: DeleteItemRepository
  itemInMemoryRepository: ItemInMemoryRepository
}

const makeSut = (): SutTypes => {
  const deleteItemRepositoryStub = makeDeleteItemRepository()
  const itemInMemoryRepository = makeItemInMemoryRepository()

  const sut = new DbDeleteItem(deleteItemRepositoryStub, itemInMemoryRepository)

  return {
    sut,
    deleteItemRepositoryStub,
    itemInMemoryRepository
  }
}

describe('DbAddItem Usecase', () => {
  test('Should call DeleteItemRepository with correct values', async () => {
    const { sut, deleteItemRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(deleteItemRepositoryStub, 'delete')

    await sut.delete(makeFakeItemData())

    expect(addSpy).toHaveBeenCalledWith(makeFakeItemData())
  })

  test('Should throw if AddItemRepository throws', async () => {
    const { sut, deleteItemRepositoryStub } = makeSut()
    jest.spyOn(deleteItemRepositoryStub, 'delete')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.delete(makeFakeItemData())
    await expect(promise).rejects.toThrow('')
  })

  test('Should delete an Item In Memory on success', async () => {
    const { sut, itemInMemoryRepository } = makeSut()

    const addSpy = jest.spyOn(itemInMemoryRepository, 'delete')

    await sut.delete(makeFakeItemData())

    expect(addSpy).toHaveBeenCalledWith(makeFakeItemData().itemId)
    // await sut.delete(makeFakeItemData())
    // expect(sut.delete).toHaveBeenCalledWith(makeFakeItemData())
  })

  test('Should throw if ItemInMemoryRepository throws', async () => {
    const { sut, itemInMemoryRepository } = makeSut()
    jest.spyOn(itemInMemoryRepository, 'delete')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.delete(makeFakeItemData())
    await expect(promise).rejects.toThrow('')
  })

})