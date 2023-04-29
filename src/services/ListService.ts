import axios from 'axios';
import { CreateListDto } from '../models/dto/CreateListDto';
import { ApiResponse } from '../models/ApiResponse';

export class ListService {
  public async CreateList(userId: number, dto: CreateListDto): Promise<any> {
    const response = await axios.post<ApiResponse<any>>(
      `${import.meta.env.VITE_API_URL}/users/${userId}/lists`,
      dto,
    );
    if (!response.data.success) throw new Error(response.data.message);
    return response.data.data;
  }
}
