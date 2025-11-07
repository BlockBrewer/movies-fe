"use client"

import { AuthLayout } from "@/components/auth-layout"
import { MovieForm } from "@/components/movie-form"
import type { MovieFormValues } from "@/hooks/use-movie-form"

export default function EditMoviePage() {
  const handleUpdate = async (values: MovieFormValues) => {
    console.log("Updating movie:", values)
  }

  return (
    <AuthLayout>
      <MovieForm title="Edit" submitLabel="Update" cancelHref="/movies" onSubmit={handleUpdate} />
    </AuthLayout>
  )
}
