import { HttpRequest, HttpResponse, Controller, GetIAlltems } from './item-protocols'
import { MissingParamError, InvalidParamError } from '../../errors'
import { badRequest, serverError, ok } from '../../helpers/http-helper'

export class GetAllItemsController implements Controller {
  private readonly getItem: GetIAlltems
  constructor (getItem: GetIAlltems) {
    this.getItem = getItem
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const item = await this.getItem.findAllItems()
      return ok(item)
    } catch (error) {
      console.log(error)
      return serverError()
    }
  }
}