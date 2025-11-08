import { apiClient } from "../client";
import type { User, PaginationQuery, PaginatedResponse } from "../types";

class UsersService {
  private readonly basePath = "/users";

  async getAll(query: PaginationQuery = {}): Promise<PaginatedResponse<User>> {
    const response = await apiClient.get<PaginatedResponse<User>>(
      this.basePath,
      { params: query }
    );
    return response.data;
  }

  async getById(id: string): Promise<User> {
    const response = await apiClient.get<User>(`${this.basePath}/${id}`);
    return response.data;
  }
}

export const usersService = new UsersService();
