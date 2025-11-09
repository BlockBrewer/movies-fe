import { useCallback, useMemo } from "react";

import { useApp } from "@/components/providers/app-provider";

export function useMovieList() {
  const {
    movies,
    isLoading,
    moviesTotal,
    moviesPage,
    moviesLimit,
    setMoviesPage,
    isFetchingMovies,
    refetchMovies,
  } = useApp();

  const totalPages = useMemo(
    () => Math.max(Math.ceil(moviesTotal / moviesLimit), 1),
    [moviesTotal, moviesLimit]
  );

  const setPage = useCallback(
    (page: number) => {
      setMoviesPage(page);
    },
    [setMoviesPage]
  );

  const reload = useCallback(() => {
    void refetchMovies();
  }, [refetchMovies]);

  return {
    movies,
    isLoading,
    isFetching: isFetchingMovies,
    total: moviesTotal,
    page: moviesPage,
    limit: moviesLimit,
    totalPages,
    setPage,
    reload,
  };
}
