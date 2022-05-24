import { UpdateItemController } from './update-item'
import { MissingParamError, InvalidParamError } from '../../errors'
import { UpdateItem, HttpRequest, ItemModel } from './item-protocols'
import { ok, serverError, badRequest } from '../../helpers/http-helper'
const makeUpdateItem = (): UpdateItem => {
  class UpdateItemStub implements UpdateItem {
    async update (item: ItemModel): Promise<ItemModel> {
      return await new Promise(resolve => resolve(makeFakeItem()))
    }
  }
  return new UpdateItemStub()
}

interface SutTypes {
  sut: UpdateItemController
  updateItemStub: UpdateItem
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
  body: {
    name: 'any_name',
    description: 'any_description',
    category: 'any_category',
    quantity: 'any_quantity',
    unitaryValue: 'any_unitaryValue',
  },
  params: {
    itemId: 'any_id',
  }
})

const makeSut = (): SutTypes => {
  const updateItemStub = makeUpdateItem()
  const sut = new UpdateItemController(updateItemStub)
  return {
    sut,
    updateItemStub
  }
}

describe('UpdateItemController', () => {
  test('Should return 400 if no name is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        description: 'any_description',
        category: 'any_category',
        quantity: 'any_quantity',
        unitaryValue: 'any_unitaryValue',
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('name')))
  })

  test('Should return 400 if no quantity is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name',
        description: 'any_description',
        category: 'any_category',
        unitaryValue: 'any_unitaryValue',
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('quantity')))
  })

  test('Should return 400 if no amout is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name',
        description: 'any_description',
        category: 'any_category',
        quantity: 'any_quantity',
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('unitaryValue')))
  })
  test('Should return 400 if no itemId is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name',
        description: 'any_description',
        category: 'any_category',
        quantity: 'any_quantity',
        unitaryValue: 'any_unitaryValue',
      },
      params: {
        itemId: undefined
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('itemId')))
  })
   test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httResponse = await sut.handle(makeFakeRequest())
    expect(httResponse).toEqual(ok(makeFakeItem()))
  })
})