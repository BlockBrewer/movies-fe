"use client"

import { useMemo, useState } from "react"
import { Plus, LogOut } from "lucide-react"

import { AuthLayout } from "@/components/auth-layout"
import { MovieCard } from "@/components/movie-card"
import { useMovieList } from "@/hooks/use-movie-list"

const PAGE_SIZE = 8

export default function MoviesPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const { movies, isLoading } = useMovieList()

  const paginatedMovies = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE
    return movies.slice(start, start + PAGE_SIZE)
  }, [currentPage, movies])

  const totalPages = Math.max(Math.ceil(movies.length / PAGE_SIZE), 1)
  const canGoPrev = currentPage > 1
  const canGoNext = currentPage < totalPages

  const handleLogout = () => {
    console.log("User logged out")
  }

  const handlePrev = () => {
    if (!canGoPrev) return
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNext = () => {
    if (!canGoNext) return
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  return (
    <AuthLayout>
      <div className="fixed inset-x-0 top-0 z-30 bg-gradient-to-b bg-[#093545]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-bold text-white leading-none">My movies</h1>
              <button className="w-5 h-5 rounded-full border-2 border-white text-white hover:text-gray-200 hover:border-gray-200 transition flex items-center justify-center -mt-1">
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
              </button>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-white hover:text-gray-200 transition font-medium"
            >
              Logout
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="min-h-screen px-4 sm:px-6 lg:px-8 pt-32 pb-8 mb-48">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-6 justify-center mb-12">
            {isLoading
              ? Array.from({ length: PAGE_SIZE }).map((_, index) => (
                  <div
                    key={`placeholder-${index}`}
                    className="w-[282px] h-[470px] rounded-2xl bg-[#092C39]/70 animate-pulse"
                  />
                ))
              : paginatedMovies.map((movie) => (
                  <MovieCard key={movie.id} title={movie.title} year={movie.year} image={movie.image} />
                ))}
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handlePrev}
              disabled={!canGoPrev}
              className="text-white hover:text-gray-200 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }).map((_, index) => {
              const pageNumber = index + 1
              const isActive = pageNumber === currentPage
              return (
                <button
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`w-10 h-10 rounded-lg transition font-bold ${
                    isActive
                      ? "bg-[#2BD17E] text-white hover:bg-green-500"
                      : "text-white hover:bg-teal-700 font-medium"
                  }`}
                >
                  {pageNumber}
                </button>
              )
            })}
            <button
              onClick={handleNext}
              disabled={!canGoNext}
              className="text-white hover:text-gray-200 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}
