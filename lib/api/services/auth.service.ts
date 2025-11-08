import { apiClient } from "../client";
import { tokenStorage } from "../token-storage";
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  User,
} from "../types";

class AuthService {
  private readonly basePath = "/auth";

  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      `${this.basePath}/login`,
      credentials
    );

    tokenStorage.saveTokens(response.data);

    return response.data;
  }

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      `${this.basePath}/register`,
      data
    );

    tokenStorage.saveTokens(response.data);

    return response.data;
  }

  async logout(): Promise<void> {
    tokenStorage.clearTokens();
  }

  isAuthenticated(): boolean {
    return tokenStorage.isAuthenticated();
  }

  getAccessToken(): string | null {
    return tokenStorage.getAccessToken();
  }

  getCurrentUser(): Partial<User> | null {
    const token = tokenStorage.getAccessToken();
    if (!token) return null;

    try {
      const payload = token.split(".")[1];
      const decoded = JSON.parse(atob(payload));

      return {
        id: decoded.sub || decoded.userId,
        email: decoded.email,
        fullName: decoded.fullName,
        roles: decoded.roles || [],
      };
    } catch (error) {
      console.error("Failed to decode token:", error);
      return null;
    }
  }
}

export const authService = new AuthService();
