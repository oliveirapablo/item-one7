import { AddItemRepository } from '../../../../data/protocols/add-item-repository'
import { AddItemModel, ItemModel } from '../../../../presentation/protocols'
import { MongoHelper } from '../helpers/mongo-helper'

export class ItemMongoRepository implements AddItemRepository {
  async add (itemData: AddItemModel): Promise<ItemModel> {
    const itemCollection = await MongoHelper.getCollection('items')
    const lastUpdate = new Date();
    const result = await itemCollection.insertOne({
      ...itemData,
      lastUpdate,
    })
    return MongoHelper.map({...itemData, lastUpdate, _id: result.insertedId})
  }
}