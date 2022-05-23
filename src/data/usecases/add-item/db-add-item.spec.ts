import { ItemModel, AddItemModel, AddItemRepository } from './db-add-item-protocols'
import { DbAddItem } from './db-add-item'

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
  }
  return new AddItemRepositoryStub()
}

interface SutTypes {
  sut: DbAddItem
  addItemRepositoryStub: AddItemRepository
}

const makeSut = (): SutTypes => {
  const addItemRepositoryStub = makeAddItemRepository()
  const sut = new DbAddItem(addItemRepositoryStub)

  return {
    sut,
    addItemRepositoryStub
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

  test('Should an Item on success', async () => {
    const { sut } = makeSut()
    const item = await sut.add(makeFakeItemData())
    expect(item).toEqual(makeFakeItem())
  })
})