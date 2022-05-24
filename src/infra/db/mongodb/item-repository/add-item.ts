import { AddItemRepository } from '../../../../data/protocols/add-item-repository'
import { AddItemModel, GetItemModel,ItemModel, ItemsModel } from '../../../../presentation/protocols'
import { MongoHelper } from '../helpers/mongo-helper'
import { ObjectId } from 'mongodb'

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

  async findById (item: GetItemModel): Promise<ItemModel> {
    const itemCollection = await MongoHelper.getCollection('items')
    const result = await itemCollection.findOne({
      _id: new ObjectId(item.itemId)
    })
    return MongoHelper.map(result)
  }

  // async findAll (): Promise<ItemsModel> {
  //   const itemsCollection = await MongoHelper.getCollection('items')
  //   const query = new QueryBuilder()
  //     .project({
  //       _id: 1,
  //       name: 1,
  //       description: 1,
  //       category: 1,
  //       quantity: 1,
  //       unitaryValue: 1,
  //       lastUpdate: 1
  //     })
  //     .build()
  //   const items = await itemsCollection.aggregate(query).toArray()
  //   return MongoHelper.mapCollection(items)
  // }
}