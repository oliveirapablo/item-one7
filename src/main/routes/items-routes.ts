import { Router } from 'express'
import { makeAddItem } from '../factories/add-item'
import { makeGetItem } from '../factories/get-item'
import { makeGetAllItems } from '../factories/get-all-items'
import { makeUpdateItem } from '../factories/update-item'
import { makeDeleteItem } from '../factories/delete-item'
import { adaptRoute } from '../adapters/item'

export default (router: Router): void => {
  router.post('/items', adaptRoute(makeAddItem()))
  router.get('/items/:itemId', adaptRoute(makeGetItem()))
  router.get('/items', adaptRoute(makeGetAllItems()))
  router.put('/items/:itemId', adaptRoute(makeUpdateItem()))
  router.delete('/items', adaptRoute(makeDeleteItem()))
}
