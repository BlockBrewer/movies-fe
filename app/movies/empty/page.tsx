import { AuthLayout } from "@/components/auth-layout"
import Link from "next/link"

export default function EmptyMoviesPage() {
  return (
    <AuthLayout>
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-8 px-2">Your movie list is empty</h1>
          <Link
            href="/movies/create"
            className="inline-block px-8 py-4 bg-green-400 hover:bg-green-500 text-white font-bold rounded-lg transition duration-200"
          >
            Add a new movie
          </Link>
        </div>
      </div>
    </AuthLayout>
  )
}
