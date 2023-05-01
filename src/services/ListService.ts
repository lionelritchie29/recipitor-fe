import axios from 'axios';
import { CreateListDto } from '../models/dto/CreateListDto';
import { ApiResponse } from '../models/ApiResponse';
import { List } from '../models/List';

export class ListService {
  public async create(userId: number, dto: CreateListDto): Promise<any> {
    const response = await axios.post<ApiResponse<any>>(
      `${import.meta.env.VITE_API_URL}/users/${userId}/lists`,
      dto,
    );
    if (!response.data.success) throw new Error(response.data.message);
    return response.data.data;
  }

  public async getByUser(userId: number): Promise<List[]> {
    const response = await axios.get<ApiResponse<List[]>>(
      `${import.meta.env.VITE_API_URL}/users/${userId}/lists`,
    );
    if (!response.data.success) throw new Error(response.data.message);
    return response.data.data;
  }
}
