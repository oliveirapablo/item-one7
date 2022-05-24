import { HttpRequest, HttpResponse, Controller, UpdateItem } from './item-protocols'
import { MissingParamError, InvalidParamError } from '../../errors'
import { badRequest, serverError, ok } from '../../helpers/http-helper'

export class UpdateItemController implements Controller {
  private readonly updateItem: UpdateItem
  constructor (updateItem: UpdateItem) {
    this.updateItem = updateItem
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredBodyFields = [
        'name',
        'quantity',
        'unitaryValue']
      for (const field of requiredBodyFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const requiredParamsFields = ['itemId',]
        for (const field of requiredParamsFields) {
          if (!httpRequest.params[field]) {
            return badRequest(new MissingParamError(field))
          }
        }
      const {
        name,
        description,
        category,
        quantity,
        unitaryValue } = httpRequest.body
      const { itemId } = httpRequest.params

      const item = await this.updateItem.update({
        itemId,
        name,
        description,
        category,
        quantity,
        unitaryValue
      })
      return ok(item)
    } catch (error) {
      console.log(error)
      return serverError()
    }
  }
}