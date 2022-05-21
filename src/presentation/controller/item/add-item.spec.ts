import { AddItemController } from './add-item'
import { MissingParamError, InvalidParamError } from '../../errors'
import { AddItem, AddItemModel, HttpRequest, ItemModel } from './item-protocols'
import { ok, serverError, badRequest } from '../../helpers/http-helper'
const makeAddItem = (): AddItem => {
  class AddItemStub implements AddItem {
    async add (item: AddItemModel): Promise<ItemModel> {
      return await new Promise(resolve => resolve(makeFakeItem()))
    }
  }
  return new AddItemStub()
}

interface SutTypes {
  sut: AddItemController
  addItemStub: AddItem
}

const makeFakeItem = (): ItemModel => ({
  itemId: 'valid_id',
  name: 'valid_name',
  description: 'valid_description',
  category: 'valid_category',
  quantity: 999,
  unitaryValue: 9.15,
  lastUpdate: new Date(),
})

const makeFakeRequest = (): HttpRequest => ({
  body: {
    itemId: 'any_id',
    name: 'any_name',
    description: 'any_description',
    category: 'any_category',
    quantity: 'any_quantity',
    unitaryValue: 'any_unitaryValue',
  }
})

const makeSut = (): SutTypes => {
  const addItemStub = makeAddItem()
  const sut = new AddItemController(addItemStub)
  return {
    sut,
    addItemStub
  }
}

describe('AddItemController', () => {
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

  // test('Should return 400 if type is not permited to provided', async () => {
  //   const { sut } = makeSut()

  //   const httpRequest = {
  //     body: {
  //       user_id: 'any_user_id',
  //       type: 'any_type',
  //       amount: 'any_amount'
  //     }
  //   }
  //   const httpResponse = await sut.handle(httpRequest)
  //   expect(httpResponse).toEqual(badRequest(new InvalidParamError('type')))
  // })

  // test('Should call AddItem with correct values', async () => {
  //   const { sut, addItemStub } = makeSut()
  //   const addSpy = jest.spyOn(addItemStub, 'add')

  //   await sut.handle(makeFakeRequest())
  //   expect(addSpy).toHaveBeenCalledWith(makeFakeRequest().body)
  // })

  // test('Should return 500 if AddItem throws', async () => {
  //   const { sut, addItemStub } = makeSut()
  //   jest.spyOn(addItemStub, 'add').mockImplementationOnce(async () => {
  //     return await new Promise((resolve, reject) => reject(new Error()))
  //   })

  //   const httResponse = await sut.handle(makeFakeRequest())
  //   expect(httResponse).toEqual(serverError())
  // })
  // test('Should return 200 if valid data is provided', async () => {
  //   const { sut } = makeSut()
  //   const httResponse = await sut.handle(makeFakeRequest())
  //   expect(httResponse).toEqual(ok(makeFakeItem()))
  // })
})