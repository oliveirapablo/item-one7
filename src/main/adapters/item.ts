import { Controller, HttpRequest } from '../../presentation/protocols'
import { Request, Response } from 'express'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      headers: req.headers,
      params: req.params
    }
    const httpResponse = await controller.handle(httpRequest)
    if (httpResponse.statusCode === 200) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    } 
      else if (httpResponse.statusCode === 204){
        res.sendStatus(httpResponse.statusCode)
      }
    else {
      res.status(httpResponse.statusCode).json(httpResponse.body.message)
    }
  }
}
