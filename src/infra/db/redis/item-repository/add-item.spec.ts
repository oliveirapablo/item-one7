// jest.mock('../helpers/redis-helper', () => ({
//   RedisHelper: {
//     setInMemory: jest.fn(async() => Promise.resolve)
//   }
// }))
import { ItemRedisRepository } from './add-item'
import {RedisHelper} from '../helpers/redis-helper'

describe('Item RedisHelper Repository', () => {
  const makeSut = (): ItemRedisRepository => {
    return new ItemRedisRepository()
  }

  test('Shoul return an item on success', async () => {
    
    const sut = makeSut()
    jest.spyOn(sut, 'add').mockImplementation()         
    const itemMock = {
      itemId: 'valid_itemId',
      name: 'valid_name',
      description: 'valid_description',
      category: 'valid_category',
      quantity: 99,
      unitaryValue: 80.99
    }
    await sut.add(itemMock)
    expect(sut.add).toHaveBeenCalled();
    expect(sut.add).toHaveBeenCalledWith(itemMock)
  })

  test('Shoul return an item of RedisHelper success', async () => {
    
    const sut = makeSut()
    const itemMock = {
      itemId: 'valid_itemId',
      name: 'valid_name',
      description: 'valid_description',
      category: 'valid_category',
      quantity: 99,
      unitaryValue: 80.99
    }

    jest.spyOn(RedisHelper, 'getInMemory').mockImplementation(async () => itemMock)         

    const itemIdMock = 'valid_itemId'
    const itemFoudedInCache = await sut.find(itemIdMock)
    expect(itemFoudedInCache).toBe(itemMock);
  })
})