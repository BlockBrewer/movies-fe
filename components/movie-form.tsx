import type { ChangeEvent, FormEvent } from "react"
import Link from "next/link"

import { useMovieForm, type MovieFormValues } from "@/hooks/use-movie-form"
import { Button } from "@/components/ui/button"

interface MovieFormProps {
  title: string
  submitLabel: string
  cancelHref: string
  onSubmit: (values: MovieFormValues) => void | Promise<void>
  initialValues?: Partial<MovieFormValues>
}

export function MovieForm({ title, submitLabel, cancelHref, onSubmit, initialValues }: MovieFormProps) {
  const { values, updateImage, updateTitle, updateYear } = useMovieForm({ initialValues })

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await onSubmit(values)
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null
    updateImage(file)
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-bold text-white mb-12">{title}</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div>
              <label htmlFor="image-upload" className="block cursor-pointer">
                <div className="ds-dropzone border-2 border-dashed rounded-lg p-8 sm:p-12 text-center transition">
                  <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <p className="text-gray-300 text-sm sm:text-base">
                    {values.image ? values.image.name : "Upload an image here"}
                  </p>
                </div>
              </label>
            <input id="image-upload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </div>

            <div className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Title"
                  value={values.title}
                  onChange={(event) => updateTitle(event.target.value)}
                  className="ds-form-field w-full px-4 sm:px-6 py-3 sm:py-4 placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--ds-color-primary)] transition"
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Publishing year"
                  value={values.year}
                  onChange={(event) => updateYear(event.target.value)}
                  className="ds-form-field w-full px-4 sm:px-6 py-3 sm:py-4 placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--ds-color-primary)] transition"
                />
              </div>

              <div className="flex gap-3 sm:gap-4 pt-4">
                <Button asChild variant="outline" size="form" className="flex-1">
                  <Link href={cancelHref}>Cancel</Link>
                </Button>
                <Button type="submit" size="form" className="flex-1">
                  {submitLabel}
                </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

