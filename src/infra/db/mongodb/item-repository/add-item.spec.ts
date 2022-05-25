import { MongoHelper } from '../helpers/mongo-helper'
import { ItemMongoRepository } from './add-item'

describe('Item Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('items')
    await accountCollection.deleteMany({})
  })

  const makeSut = (): ItemMongoRepository => {
    return new ItemMongoRepository()
  }

  test('Shoul return an item on success', async () => {
    const sut = makeSut()
    const item = await sut.add({
      name: 'valid_name',
      description: 'valid_description',
      category: 'valid_category',
      quantity: 99,
      unitaryValue: 80.99
   })
    
    expect(item.lastUpdate).toBeTruthy()
    expect(item).toBeTruthy()
    expect(item.itemId).toBeTruthy()
    expect(item.name).toBe('valid_name')
    expect(item.description).toBe('valid_description')
    expect(item.category).toBe('valid_category')
    expect(item.quantity).toBe(99)
    expect(item.unitaryValue).toBe(80.99)
  })

  // test('Shoul return an item on success findById', async () => {
  //   const sut = makeSut()
  //   const item = await sut.findById({
  //     itemId: 'valid_itemId',
  //  })
    
  //   expect(item.lastUpdate).toBeTruthy()
  //   expect(item).toBeTruthy()
  //   expect(item.itemId).toBeTruthy()
  //   expect(item.name).toBe('valid_name')
  //   expect(item.description).toBe('valid_description')
  //   expect(item.category).toBe('valid_category')
  //   expect(item.quantity).toBe(99)
  //   expect(item.unitaryValue).toBe(80.99)
  // })
})