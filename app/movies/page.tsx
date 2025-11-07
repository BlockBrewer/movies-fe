"use client"

import { useState } from "react"
import { Plus, LogOut } from "lucide-react"
import { AuthLayout } from "@/components/auth-layout"
import { MovieCard } from "@/components/movie-card"

interface Movie {
  id: number
  title: string
  year: number
  image: string
}

const MOVIES: Movie[] = [
  { id: 1, title: "Movie 1", year: 2021, image: "/movie-clapperboard.jpg" },
  { id: 2, title: "Movie 1", year: 2021, image: "/netflix-on-laptop.jpg" },
  { id: 3, title: "Movie 1", year: 2021, image: "/netflix-on-laptop.jpg" },
  { id: 4, title: "Movie 1", year: 2021, image: "/film-clapperboard-hand.jpg" },
  { id: 5, title: "Movie 1", year: 2021, image: "/movie-clapperboard.jpg" },
  { id: 6, title: "Movie 1", year: 2021, image: "/netflix-on-laptop.jpg" },
  { id: 7, title: "Movie 1", year: 2021, image: "/netflix-on-laptop.jpg" },
  { id: 8, title: "Movie 1", year: 2021, image: "/film-clapperboard-hand.jpg" },
]

export default function MoviesPage() {
  const [currentPage, setCurrentPage] = useState(1)

  const handleLogout = () => {
    console.log("User logged out")
  }

  return (
    <AuthLayout>
      {/* Fixed Header */}
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

      {/* Content with top padding to account for fixed header */}
      <div className="min-h-screen px-4 sm:px-6 lg:px-8 pt-32 pb-8 mb-48">
        <div className="max-w-7xl mx-auto">
          {/* Movie Grid */}
          <div className="flex flex-wrap gap-6 justify-center mb-12">
            {MOVIES.map((movie) => (
              <MovieCard key={movie.id} title={movie.title} year={movie.year} image={movie.image} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-4">
            <button className="text-white hover:text-gray-200 transition font-medium">Prev</button>
            <button className="w-10 h-10 bg-[#2BD17E] text-white font-bold rounded-lg hover:bg-green-500 transition">
              1
            </button>
            <button className="w-10 h-10 text-white hover:bg-teal-700 font-medium rounded-lg transition">2</button>
            <button className="text-white hover:text-gray-200 transition font-medium">Next</button>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}
