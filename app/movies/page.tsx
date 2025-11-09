"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Plus, LogOut } from "lucide-react";
import { useTranslations } from "next-intl";

import { AuthLayout } from "@/components/auth-layout";
import { MovieCard } from "@/components/movie-card";
import { useApp } from "@/components/providers/app-provider";
import { useMovieList } from "@/hooks/use-movie-list";
import { toast } from "@/hooks/use-toast";

const PAGE_SIZE = 8;

export default function MoviesPage() {
  const tMovies = useTranslations("movies.list");
  const tAuth = useTranslations("auth.logout");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasShownWelcome, setHasShownWelcome] = useState(false);
  const { movies, isLoading } = useMovieList();
  const { user, signOut } = useApp();
  const router = useRouter();

  const paginatedMovies = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return movies.slice(start, start + PAGE_SIZE);
  }, [currentPage, movies]);

  const totalPages = Math.max(Math.ceil(movies.length / PAGE_SIZE), 1);
  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  useEffect(() => {
    if (user && !hasShownWelcome) {
      const justLoggedIn = sessionStorage.getItem("justLoggedIn");
      if (justLoggedIn === "true") {
        toast({
          title: tMovies("welcomeBack"),
          description: tMovies("loggedInAs", { email: user.email }),
          variant: "default",
        });
        sessionStorage.removeItem("justLoggedIn");
      }
      setHasShownWelcome(true);
    }
  }, [user, hasShownWelcome, t]);

  if (!user) {
    return null;
  }

  const handleLogout = async () => {
    await signOut();
  };

  const handlePrev = () => {
    if (!canGoPrev) return;
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    if (!canGoNext) return;
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <AuthLayout>
      <div className="fixed inset-x-0 top-0 z-30 bg-gradient-to-b bg-[var(--ds-color-background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-bold text-white leading-none">
              {tMovies("title")}
              </h1>
              <button
                type="button"
                onClick={() => router.push("/movies/manage")}
                className="w-5 h-5 rounded-full border-2 border-white text-white transition flex items-center justify-center -mt-1 hover:border-gray-200 hover:text-gray-200"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
              </button>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-2 text-white transition font-medium hover:text-gray-200"
            >
              {tAuth("button")}
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="min-h-screen px-4 sm:px-6 lg:px-8 pt-32 pb-8 mb-48">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-6 justify-center mb-12">
            {isLoading
              ? Array.from({ length: PAGE_SIZE }).map((_, index) => (
                  <div
                    key={`placeholder-${index}`}
                    className="w-[var(--ds-card-width)] h-[var(--ds-card-height)] rounded-2xl animate-pulse opacity-70 bg-[var(--ds-color-surface)]"
                  />
                ))
              : paginatedMovies.map((movie) => (
                  <Link
                    key={movie.id}
                    href={`/movies/manage?id=${movie.id}`}
                    className="block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900/60"
                  >
                    <MovieCard
                      title={movie.title}
                      year={movie.year}
                      image={movie.image}
                    />
                  </Link>
                ))}
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handlePrev}
              disabled={!canGoPrev}
              className="text-white hover:text-gray-200 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {tMovies("prev")}
            </button>
            {Array.from({ length: totalPages }).map((_, index) => {
              const pageNumber = index + 1;
              const isActive = pageNumber === currentPage;
              return (
                <button
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`w-10 h-10 rounded-lg transition font-bold ${
                    isActive
                      ? "bg-[var(--ds-color-primary)] text-[var(--ds-color-text)] hover:bg-[var(--ds-color-primary-hover)]"
                      : "text-[var(--ds-color-text)] hover:bg-[var(--ds-color-surface-accent)] font-medium"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
            <button
              onClick={handleNext}
              disabled={!canGoNext}
              className="text-white hover:text-gray-200 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {tMovies("next")}
            </button>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
