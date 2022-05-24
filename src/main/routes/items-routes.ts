import { Router } from 'express'
import { makeAddItem } from '../factories/add-item'
import { makeGetItem } from '../factories/get-item'
import { adaptRoute } from '../adapters/item'

export default (router: Router): void => {
  router.post('/items', adaptRoute(makeAddItem()))
  router.get('/items/:itemId', adaptRoute(makeGetItem()))
}
