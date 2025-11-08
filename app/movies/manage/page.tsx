"use client";

import { Suspense, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { AuthLayout } from "@/components/auth-layout";
import { MovieForm } from "@/components/movie-form";
import { useApp } from "@/components/providers/app-provider";
import type { MovieFormValues } from "@/hooks/use-movie-form";

function ManageMovieContent() {
  const t = useTranslations("movies.form");
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, createMovie, updateMovie, getMovie } = useApp();

  const movieId = useMemo(() => {
    const idParam = searchParams.get("id");
    if (!idParam) {
      return null;
    }
    const parsed = Number(idParam);
    return Number.isNaN(parsed) ? null : parsed;
  }, [searchParams]);

  const movie = movieId != null ? getMovie(movieId) : undefined;
  const isEditing = movieId != null;

  useEffect(() => {
    if (!user) {
      router.replace("/");
    }
  }, [router, user]);

  useEffect(() => {
    if (user && isEditing && !movie) {
      router.replace("/movies");
    }
  }, [isEditing, movie, router, user]);

  if (!user) {
    return null;
  }

  if (isEditing && !movie) {
    return null;
  }

  const handleSubmit = async (values: MovieFormValues) => {
    const parsedYear = Number(values.year);
    const normalizedYear = Number.isNaN(parsedYear)
      ? new Date().getFullYear()
      : parsedYear;
    const sanitizedTitle = values.title.trim();

    const imageSource = values.image
      ? URL.createObjectURL(values.image)
      : movie?.image ?? "/placeholder.svg";

    if (isEditing && movie) {
      await updateMovie(movie.id, {
        title: sanitizedTitle,
        year: normalizedYear,
        image: imageSource,
      });
    } else {
      await createMovie({
        title: sanitizedTitle,
        year: normalizedYear,
        image: imageSource,
      });
    }

    router.push("/movies");
  };

  return (
    <AuthLayout>
      <MovieForm
        title={isEditing ? t("edit.title") : t("create.title")}
        submitLabel={
          isEditing ? t("edit.submitButton") : t("create.submitButton")
        }
        cancelHref="/movies"
        onSubmit={handleSubmit}
        variant={isEditing ? "edit" : "create"}
        initialValues={
          isEditing && movie
            ? {
                title: movie.title,
                year: movie.year.toString(),
              }
            : undefined
        }
        existingImageLabel={
          isEditing && movie
            ? movie.image.startsWith("blob:")
              ? t("fields.uploadedImage")
              : movie.image.split("/").pop()
            : undefined
        }
        existingImageUrl={isEditing && movie ? movie.image : undefined}
      />
    </AuthLayout>
  );
}

export default function ManageMoviePage() {
  return (
    <Suspense
      fallback={
        <AuthLayout>
          <div className="flex min-h-screen items-center justify-center">
            <div className="text-white">Loading...</div>
          </div>
        </AuthLayout>
      }
    >
      <ManageMovieContent />
    </Suspense>
  );
}
