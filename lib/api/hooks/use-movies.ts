import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { moviesService } from "../services";
import type {
  Movie,
  CreateMovieRequest,
  CreateMovieWithUploadRequest,
  UpdateMovieRequest,
  UploadPosterResponse,
  PaginatedResponse,
  PaginationQuery,
} from "../types";

export const movieKeys = {
  all: ["movies"] as const,
  lists: () => [...movieKeys.all, "list"] as const,
  list: (filters?: any) => [...movieKeys.lists(), { filters }] as const,
  details: () => [...movieKeys.all, "detail"] as const,
  detail: (id: string) => [...movieKeys.details(), id] as const,
};

export function useMovies(
  query: PaginationQuery = {},
  options?: { enabled?: boolean }
) {
  return useQuery<PaginatedResponse<Movie>, Error>({
    queryKey: movieKeys.list(query),
    queryFn: () => moviesService.getAll(query),
    staleTime: 5 * 60 * 1000,
    keepPreviousData: true,
    enabled: options?.enabled ?? true,
  });
}

export function useMovie(id: string) {
  return useQuery<Movie, Error>({
    queryKey: movieKeys.detail(id),
    queryFn: () => moviesService.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateMovie() {
  const queryClient = useQueryClient();

  return useMutation<Movie, Error, CreateMovieRequest>({
    mutationFn: (data: CreateMovieRequest) => moviesService.create(data),
    onSuccess: (newMovie) => {
      queryClient.invalidateQueries({ queryKey: movieKeys.lists() });
    },
  });
}

export function useCreateMovieWithUpload() {
  const queryClient = useQueryClient();

  return useMutation<Movie, Error, CreateMovieWithUploadRequest>({
    mutationFn: (data: CreateMovieWithUploadRequest) =>
      moviesService.createWithUpload(data),
    onSuccess: (newMovie) => {
      queryClient.invalidateQueries({ queryKey: movieKeys.lists() });
    },
  });
}

export function useUploadPoster() {
  return useMutation<UploadPosterResponse, Error, File>({
    mutationFn: (file: File) => moviesService.uploadPoster(file),
  });
}

export function useUpdateMovie() {
  const queryClient = useQueryClient();

  return useMutation<Movie, Error, { id: string; data: UpdateMovieRequest }>({
    mutationFn: ({ id, data }) => moviesService.update(id, data),
    onSuccess: (updatedMovie) => {
      queryClient.setQueryData<Movie>(movieKeys.detail(updatedMovie.id), updatedMovie);
      queryClient.invalidateQueries({ queryKey: movieKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: movieKeys.detail(updatedMovie.id),
      });
    },
  });
}

export function useDeleteMovie() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (id: string) => moviesService.delete(id),
    onSuccess: (_, deletedId) => {
      queryClient.removeQueries({ queryKey: movieKeys.detail(deletedId) });

      queryClient.invalidateQueries({ queryKey: movieKeys.lists() });
    },
  });
}
