import type { Movie } from './types'

export interface MovieRepository {
  getAll(): Promise<Movie[]>
  getById(id: number): Promise<Movie | undefined>
  create(movie: Movie): Promise<Movie>
  update(movie: Movie): Promise<Movie>
  delete(id: number): Promise<void>
}

