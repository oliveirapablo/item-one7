import { DeleteItemModel } from "../usecases/delete-item/db-delete-item-protocols";


export interface DeleteItemRepository {
  delete (item: DeleteItemModel): Promise<void>
}