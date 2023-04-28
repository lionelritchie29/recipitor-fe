import axios from 'axios';
import { ApiResponse } from '../models/ApiResponse';
import { LoginDto } from '../models/dto/LoginDto';

export class AuthService {
  public async register(dto: LoginDto): Promise<any> {
    const response = await axios.post<ApiResponse<any>>(
      `${import.meta.env.VITE_API_URL}/auth/register`,
      dto,
    );
    if (!response.data.success) throw new Error(response.data.message);
    return response.data.data;
  }

  public async login(dto: LoginDto): Promise<string> {
    const response = await axios.post<ApiResponse<string>>(
      `${import.meta.env.VITE_API_URL}/auth/login`,
      dto,
    );
    if (!response.data.success) throw new Error(response.data.message);
    return response.data.data;
  }
}
