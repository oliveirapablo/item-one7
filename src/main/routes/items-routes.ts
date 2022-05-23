import { Router } from 'express'
import { makeAddItem } from '../factories/add-item'
import { adaptRoute } from '../adapters/item'

export default (router: Router): void => {
  router.post('/items', adaptRoute(makeAddItem()))
}
