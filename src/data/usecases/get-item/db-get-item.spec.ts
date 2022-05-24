import { ItemModel, GetItemModel, GetItemRepository } from './db-get-item-protocols'
import { DbGetItem } from './db-get-item'

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
}

const makeSut = (): SutTypes => {
  const getItemRepositoryStub = makeGetItemRepository()
  const sut = new DbGetItem(getItemRepositoryStub)

  return {
    sut,
    getItemRepositoryStub
  }
}

describe('DbGetItem Usecase', () => {
  test('Should call GetItemRepository with correct values', async () => {
    const { sut, getItemRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(getItemRepositoryStub, 'findById')

    await sut.findById(makeFakeItemData())

    expect(addSpy).toHaveBeenCalledWith(makeFakeItemData())
  })

  test('Should throw if AddItemRepository throws', async () => {
    const { sut, getItemRepositoryStub } = makeSut()
    jest.spyOn(getItemRepositoryStub, 'findById')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.findById(makeFakeItemData())
    await expect(promise).rejects.toThrow('')
  })

  test('Should an Item on success', async () => {
    const { sut } = makeSut()
    const item = await sut.findById(makeFakeItemData())
    expect(item).toEqual(makeFakeItem())
  })
})