"use client"

import { AuthLayout } from "@/components/auth-layout"
import { MovieForm } from "@/components/movie-form"
import type { MovieFormValues } from "@/hooks/use-movie-form"

export default function CreateMoviePage() {
  const handleCreate = async (values: MovieFormValues) => {
    console.log("Creating movie:", values)
  }

  return (
    <AuthLayout>
      <MovieForm title="Create a new movie" submitLabel="Submit" cancelHref="/movies" onSubmit={handleCreate} />
    </AuthLayout>
  )
}
