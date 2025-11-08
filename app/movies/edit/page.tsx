import { redirect } from "next/navigation"

interface EditPageProps {
  searchParams?: Record<string, string | string[] | undefined>
}

export default function LegacyEditMoviePage({ searchParams }: EditPageProps) {
  const idParam = searchParams?.id
  const id = Array.isArray(idParam) ? idParam[0] : idParam
  const suffix = id ? `?id=${id}` : ""
  redirect(`/movies/manage${suffix}`)
}
