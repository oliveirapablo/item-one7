import { HttpRequest, HttpResponse, Controller, GetItem } from './item-protocols'
import { MissingParamError, InvalidParamError } from '../../errors'
import { badRequest, serverError, ok } from '../../helpers/http-helper'

export class GetItemController implements Controller {
  private readonly getItem: GetItem
  constructor (getItem: GetItem) {
    this.getItem = getItem
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['itemId']
      for (const field of requiredFields) {
        if (!httpRequest.params[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const {
        itemId } = httpRequest.params

      const item = await this.getItem.find({
        itemId
      })
      return ok(item)
    } catch (error) {
      return serverError()
    }
  }
}