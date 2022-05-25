import { DeleteItemController } from './delete-item'
import { MissingParamError, InvalidParamError } from '../../errors'
import { DeleteItem, DeleteItemModel, HttpRequest, ItemModel } from './item-protocols'
import { ok, serverError, badRequest, noContent } from '../../helpers/http-helper'
jest.useFakeTimers();
const makeAddItem = (): DeleteItem => {
  class DeleteItemStub implements DeleteItem {
    async delete (item: DeleteItemModel): Promise<void> {
      jest.fn().mockImplementationOnce(() => Promise.resolve())
    }
  }
  return new DeleteItemStub()
}

interface SutTypes {
  sut: DeleteItemController
  deleteItemStub: DeleteItem
}

const makeFakeRequest = (): HttpRequest => ({
  body: {
    itemId: 'any_id',
  }
})

const makeSut = (): SutTypes => {
  const deleteItemStub = makeAddItem()
  const sut = new DeleteItemController(deleteItemStub)
  return {
    sut,
    deleteItemStub
  }
}

describe('DeleteItemController', () => {
  test('Should return 400 if no itemId is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        itemId: undefined,
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('itemId')))
  })

   test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httResponse = await sut.handle(makeFakeRequest())
    expect(httResponse).toEqual(noContent())
  })
})