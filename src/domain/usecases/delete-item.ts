export interface DeleteItemModel {
  itemId: string
}

export interface DeleteItem {
  delete (item: DeleteItemModel): Promise<void>
}