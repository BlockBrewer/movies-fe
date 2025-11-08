import { useCallback } from "react"

import { useApp } from "@/components/providers/app-provider"

export function useMovieList() {
  const { movies } = useApp()
  const reload = useCallback(() => undefined, [])

  return {
    movies,
    isLoading: false,
    error: undefined as string | undefined,
    reload,
  }
}
