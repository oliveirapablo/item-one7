import { GetItemController } from './get-tem'
import { MissingParamError, InvalidParamError } from '../../errors'
import { GetItem, GetItemModel, HttpRequest, ItemModel } from './item-protocols'
import { ok, serverError, badRequest } from '../../helpers/http-helper'
const makeGetItem = (): GetItem => {
  class GetItemStub implements GetItem {
    async findById (item: GetItemModel): Promise<ItemModel> {
      return await new Promise(resolve => resolve(makeFakeItem()))
    }
  }
  return new GetItemStub()
}

interface SutTypes {
  sut: GetItemController
  getItemStub: GetItem
}

const makeFakeItem = (): ItemModel => ({
  itemId: 'valid_id',
  name: 'valid_name',
  description: 'valid_description',
  category: 'valid_category',
  quantity: 999,
  unitaryValue: 9.15
})

const makeFakeRequest = (): HttpRequest => ({
  params: {
    itemId: 'any_id'
  }
})

const makeSut = (): SutTypes => {
  const getItemStub = makeGetItem()
  const sut = new GetItemController(getItemStub)
  return {
    sut,
    getItemStub
  }
}

describe('GetItemController', () => {
  test('Should return 400 if no name is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      params: {
        itemId: undefined,
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    return expect(httpResponse).toEqual(badRequest(new MissingParamError('itemId')))
   })

   test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httResponse = await sut.handle(makeFakeRequest())
    expect(httResponse).toEqual(ok(makeFakeItem()))
  })
})