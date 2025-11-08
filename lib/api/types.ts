export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
  phoneNumber?: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export type Role = "ADMIN" | "USER";

export interface User {
  id: string;
  email: string;
  fullName: string;
  roles: Role[];
  createdAt: string;
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface Movie {
  id: string;
  title: string;
  publishingYear: number;
  posterUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMovieRequest {
  title: string;
  publishingYear: number;
  posterUrl: string;
}

export interface CreateMovieWithUploadRequest {
  title: string;
  publishingYear: number;
  poster?: File;
}

export interface UpdateMovieRequest {
  title?: string;
  publishingYear?: number;
  posterUrl?: string;
  poster?: File;
}

export interface UploadPosterResponse {
  url: string;
}

export interface ApiError {
  message: string;
  statusCode?: number;
  error?: string;
}
