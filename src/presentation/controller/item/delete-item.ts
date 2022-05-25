import { HttpRequest, HttpResponse, Controller, DeleteItem } from './item-protocols'
import { MissingParamError, InvalidParamError } from '../../errors'
import { badRequest, serverError, noContent } from '../../helpers/http-helper'

export class DeleteItemController implements Controller {
  private readonly deleteItem: DeleteItem
  constructor (deleteItem: DeleteItem) {
    this.deleteItem = deleteItem
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredBodyFields = ['itemId',]
        for (const field of requiredBodyFields) {
          if (!httpRequest.body[field]) {
            return badRequest(new MissingParamError(field))
          }
        }
      const { itemId } = httpRequest.body

      await this.deleteItem.delete({
        itemId,
      })
      return noContent()
    } catch (error) {
      console.log(error)
      return serverError()
    }
  }
}