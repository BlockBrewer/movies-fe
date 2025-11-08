import { redirect } from "next/navigation"

export default function LegacyCreateMoviePage() {
  redirect("/movies/manage")
}
