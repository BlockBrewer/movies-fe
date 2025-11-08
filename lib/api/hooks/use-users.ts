import { useQuery } from "@tanstack/react-query";
import { usersService } from "../services";
import type { User, PaginationQuery, PaginatedResponse } from "../types";

export const userKeys = {
  all: ["users"] as const,
  lists: () => [...userKeys.all, "list"] as const,
  list: (query?: PaginationQuery) => [...userKeys.lists(), { query }] as const,
  details: () => [...userKeys.all, "detail"] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
};

export function useUsers(query?: PaginationQuery) {
  return useQuery<PaginatedResponse<User>, Error>({
    queryKey: userKeys.list(query),
    queryFn: () => usersService.getAll(query),
    staleTime: 5 * 60 * 1000,
  });
}

export function useUser(id: string) {
  return useQuery<User, Error>({
    queryKey: userKeys.detail(id),
    queryFn: () => usersService.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}
