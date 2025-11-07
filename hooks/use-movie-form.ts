import { useCallback, useMemo, useState } from 'react'

interface MovieFormValues {
  title: string
  year: string
  image: File | null
}

interface UseMovieFormOptions {
  initialValues?: Partial<MovieFormValues>
}

const defaultValues: MovieFormValues = {
  title: '',
  year: '',
  image: null,
}

export function useMovieForm(options: UseMovieFormOptions = {}) {
  const [values, setValues] = useState<MovieFormValues>({
    ...defaultValues,
    ...options.initialValues,
  })

  const updateValue = useCallback(<K extends keyof MovieFormValues>(key: K, value: MovieFormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }))
  }, [])

  const reset = useCallback(() => setValues(defaultValues), [])

  return useMemo(
    () => ({
      values,
      updateTitle: (title: string) => updateValue('title', title),
      updateYear: (year: string) => updateValue('year', year),
      updateImage: (image: File | null) => updateValue('image', image),
      reset,
    }),
    [reset, updateValue, values],
  )
}

export type { MovieFormValues }

