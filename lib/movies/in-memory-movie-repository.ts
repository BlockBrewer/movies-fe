import type { Movie } from './types'
import type { MovieRepository } from './movie-repository'

const INITIAL_MOVIES: Movie[] = [
  { id: 1, title: 'Movie 1', year: 2021, image: '/movie-clapperboard.jpg' },
  { id: 2, title: 'Movie 1', year: 2021, image: '/netflix-on-laptop.jpg' },
  { id: 3, title: 'Movie 1', year: 2021, image: '/netflix-on-laptop.jpg' },
  { id: 4, title: 'Movie 1', year: 2021, image: '/film-clapperboard-hand.jpg' },
  { id: 5, title: 'Movie 1', year: 2021, image: '/movie-clapperboard.jpg' },
  { id: 6, title: 'Movie 1', year: 2021, image: '/netflix-on-laptop.jpg' },
  { id: 7, title: 'Movie 1', year: 2021, image: '/netflix-on-laptop.jpg' },
  { id: 8, title: 'Movie 1', year: 2021, image: '/film-clapperboard-hand.jpg' },
]

function normalizeMovie(movie: Movie): Movie {
  return { ...movie, id: Number(movie.id) }
}

function getNextId(movies: Movie[]): number {
  const maxId = movies.reduce((max, movie) => Math.max(max, Number(movie.id) || 0), 0)
  return maxId + 1
}

export class InMemoryMovieRepository implements MovieRepository {
  private movies: Movie[] = INITIAL_MOVIES.map(normalizeMovie)

  async getAll(): Promise<Movie[]> {
    return structuredClone(this.movies)
  }

  async getById(id: number): Promise<Movie | undefined> {
    return structuredClone(this.movies.find((movie) => movie.id === id))
  }

  async create(movie: Movie): Promise<Movie> {
    const nextId = movie.id ?? getNextId(this.movies)
    const record = normalizeMovie({ ...movie, id: nextId })
    this.movies = [...this.movies, record]
    return structuredClone(record)
  }

  async update(movie: Movie): Promise<Movie> {
    this.movies = this.movies.map((existing) => (existing.id === movie.id ? normalizeMovie(movie) : existing))
    return structuredClone(movie)
  }

  async delete(id: number): Promise<void> {
    this.movies = this.movies.filter((movie) => movie.id !== id)
  }
}

export const inMemoryMovieRepository = new InMemoryMovieRepository()

