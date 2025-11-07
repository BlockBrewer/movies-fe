import { useCallback, useEffect, useState } from 'react'

import type { MovieRepository } from '@/lib/movies/movie-repository'
import { inMemoryMovieRepository } from '@/lib/movies/in-memory-movie-repository'
import type { Movie } from '@/lib/movies/types'

interface UseMovieListOptions {
  repository?: MovieRepository
}

interface MovieListState {
  movies: Movie[]
  isLoading: boolean
  error?: string
}

const initialState: MovieListState = {
  movies: [],
  isLoading: true,
}

export function useMovieList(options: UseMovieListOptions = {}) {
  const repository = options.repository ?? inMemoryMovieRepository
  const [state, setState] = useState<MovieListState>(initialState)

  const loadMovies = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: undefined }))

    try {
      const movies = await repository.getAll()
      setState({ movies, isLoading: false, error: undefined })
    } catch (error) {
      setState({
        movies: [],
        isLoading: false,
        error: error instanceof Error ? error.message : 'Unable to load movies',
      })
    }
  }, [repository])

  useEffect(() => {
    void loadMovies()
  }, [loadMovies])

  return {
    ...state,
    reload: loadMovies,
  }
}

