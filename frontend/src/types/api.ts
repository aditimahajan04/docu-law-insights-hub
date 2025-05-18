import { AxiosResponse } from 'axios';

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

export type ApiResponseType<T> = AxiosResponse<ApiResponse<T>>; 