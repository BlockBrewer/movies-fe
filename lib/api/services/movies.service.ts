import { apiClient, createFormData } from "../client";
import type {
  Movie,
  CreateMovieRequest,
  CreateMovieWithUploadRequest,
  UpdateMovieRequest,
  UploadPosterResponse,
  PaginatedResponse,
  PaginationQuery,
} from "../types";

class MoviesService {
  private readonly basePath = "/movies";

  async getAll(
    query: PaginationQuery = {}
  ): Promise<PaginatedResponse<Movie>> {
    const response = await apiClient.get<PaginatedResponse<Movie>>(
      this.basePath,
      { params: query }
    );
    return response.data;
  }

  async getById(id: string): Promise<Movie> {
    const response = await apiClient.get<Movie>(`${this.basePath}/${id}`);
    return response.data;
  }

  async create(data: CreateMovieRequest): Promise<Movie> {
    const response = await apiClient.post<Movie>(this.basePath, data);
    return response.data;
  }

  async createWithUpload(data: CreateMovieWithUploadRequest): Promise<Movie> {
    const formData = createFormData({
      title: data.title,
      publishingYear: data.publishingYear,
      ...(data.poster && { poster: data.poster }),
    });

    const response = await apiClient.post<Movie>(
      `${this.basePath}/with-upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  }

  async uploadPoster(file: File): Promise<UploadPosterResponse> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiClient.post<UploadPosterResponse>(
      `${this.basePath}/upload-poster`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  }

  async update(id: string, data: UpdateMovieRequest): Promise<Movie> {
    if (data.poster) {
      const formData = createFormData({
        ...(data.title && { title: data.title }),
        ...(data.publishingYear && { publishingYear: data.publishingYear }),
        ...(data.posterUrl !== undefined && { posterUrl: data.posterUrl }),
        poster: data.poster,
      });

      const response = await apiClient.patch<Movie>(
        `${this.basePath}/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    }

    const { poster, ...jsonData } = data;
    const response = await apiClient.patch<Movie>(
      `${this.basePath}/${id}`,
      jsonData
    );

    return response.data;
  }

  async delete(id: string): Promise<void> {
    await apiClient.delete(`${this.basePath}/${id}`);
  }
}

export const moviesService = new MoviesService();
