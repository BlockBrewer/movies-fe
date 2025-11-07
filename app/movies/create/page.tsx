"use client"

import type React from "react"
import { useState } from "react"
import { AuthLayout } from "@/components/auth-layout"
import Link from "next/link"

export default function CreateMoviePage() {
  const [title, setTitle] = useState("")
  const [year, setYear] = useState("")
  const [image, setImage] = useState<File | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Creating movie:", { title, year, image })
  }

  return (
    <AuthLayout>
      <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-12">Create a new movie</h1>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Upload Area */}
            <div>
              <label htmlFor="image-upload" className="block cursor-pointer">
                <div className="border-2 border-dashed border-gray-400 rounded-lg p-8 sm:p-12 text-center hover:border-green-400 transition">
                  <svg
                    className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <p className="text-gray-300 text-sm sm:text-base">{image ? image.name : "Upload an image here"}</p>
                </div>
              </label>
              <input id="image-upload" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-teal-700 bg-opacity-50 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Publishing year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-teal-700 bg-opacity-50 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 sm:gap-4 pt-4">
                <Link
                  href="/movies"
                  className="flex-1 px-4 sm:px-6 py-3 sm:py-4 border-2 border-green-400 text-green-400 font-bold rounded-lg hover:bg-green-400 hover:text-teal-900 transition text-center"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="flex-1 px-4 sm:px-6 py-3 sm:py-4 bg-green-400 hover:bg-green-500 text-white font-bold rounded-lg transition"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AuthLayout>
  )
}
