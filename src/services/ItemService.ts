import axios from 'axios';
import { Item } from '../models/Item';
import { ApiResponse } from '../models/ApiResponse';

export class ItemService {
  public async getItems(): Promise<Item[]> {
    const response = await axios.get<ApiResponse<Item[]>>(`${import.meta.env.VITE_API_URL}/items`);
    if (!response.data.success) throw new Error(response.data.message);
    return response.data.data;
  }
}
