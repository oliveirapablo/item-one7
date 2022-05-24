import { AddItemRepository } from '../../../../data/protocols/add-item-repository'
import { AddItemModel, GetItemModel, ItemModel, ItemsModel, DeleteItemModel } from '../../../../presentation/protocols'
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
    return MongoHelper.map({ ...itemData, lastUpdate, _id: result.insertedId })
  }

  async findById (item: GetItemModel): Promise<ItemModel> {
    const itemCollection = await MongoHelper.getCollection('items')
    const result = await itemCollection.findOne({
      _id: new ObjectId(item.itemId)
    })
    return MongoHelper.map(result)
  }

  async update (itemData: ItemModel): Promise<ItemModel> {
    const itemCollection = await MongoHelper.getCollection('items')
    const lastUpdate = new Date();
    const result = await itemCollection.updateOne({
      _id: new ObjectId(itemData.itemId)
    }, {
      $set: {
        ...itemData,
        lastUpdate
      }
    })

    return MongoHelper.map({ ...itemData, _id: new ObjectId(itemData.itemId),lastUpdate })
  }

  async findAll (): Promise<ItemsModel[]> {
    const itemsCollection = await MongoHelper.getCollection('items')
    const items = (await itemsCollection.find({}).toArray()) as unknown as ItemsModel[];
    return MongoHelper.mapCollection(items)
  }

  async delete (itemData: DeleteItemModel): Promise<void> {
    const itemsCollection = await MongoHelper.getCollection('items')
    await itemsCollection.deleteOne({
      _id: new ObjectId(itemData.itemId)
    })
  }
}