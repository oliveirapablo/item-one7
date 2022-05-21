import { HttpRequest, HttpResponse, Controller, AddItem } from './item-protocols'
import { MissingParamError, InvalidParamError } from '../../errors'
import { badRequest, serverError, ok } from '../../helpers/http-helper'

export class AddItemController implements Controller {
  private readonly addItem: AddItem
  constructor (addItem: AddItem) {
    this.addItem = addItem
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = [
        'name',
        'quantity',
        'unitaryValue']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const {
        name,
        description,
        category,
        quantity,
        unitaryValue } = httpRequest.body

      const item = await this.addItem.add({
        name,
        description,
        category,
        quantity,
        unitaryValue
      })
      return ok(item)
    } catch (error) {
      return serverError()
    }
  }
}