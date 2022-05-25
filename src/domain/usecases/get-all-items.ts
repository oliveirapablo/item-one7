import { ItemModel } from "../models/item";

export interface GetIAlltems {
  findAllItems(): Promise<ItemModel[]>
}