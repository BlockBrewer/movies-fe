"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Plus, LogOut } from "lucide-react";
import { useTranslations } from "next-intl";

import { AuthLayout } from "@/components/auth-layout";
import { MovieCard } from "@/components/movie-card";
import { useApp } from "@/components/providers/app-provider";
import { useMovieList } from "@/hooks/use-movie-list";
import { toast } from "@/hooks/use-toast";

export default function MoviesPage() {
  const tMovies = useTranslations("movies.list");
  const tAuth = useTranslations("auth.logout");
  const [hasShownWelcome, setHasShownWelcome] = useState(false);
  const {
    movies,
    isLoading,
    isFetching,
    totalPages,
    page: currentPage,
    limit,
    setPage,
  } = useMovieList();
  const { user, signOut } = useApp();
  const router = useRouter();

  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;
  const skeletonCount = limit > 0 ? limit : 1;
  const isInitialLoading = isLoading && movies.length === 0;
  const isPageTransitionPending = isFetching && !isLoading;

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
  }, [user, hasShownWelcome, tMovies]);

  if (!user) {
    return null;
  }

  const handleLogout = async () => {
    await signOut();
  };

  const handlePrev = () => {
    if (!canGoPrev) return;
    setPage(currentPage - 1);
  };

  const handleNext = () => {
    if (!canGoNext) return;
    setPage(currentPage + 1);
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
                className="w-7 h-7 rounded-full border-2 border-primary text-white transition flex items-center justify-center mt-1.5 shadow-lg hover:border-[var(--ds-color-primary)] hover:text-gray-200 hover:shadow-xl cursor-pointer"
              >
                <Plus className="w-5 h-5 stroke-[3]" />
              </button>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-2 text-white transition font-medium hover:text-gray-200 cursor-pointer"
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
            {isInitialLoading
              ? Array.from({ length: skeletonCount }).map((_, index) => (
                  <div
                    key={`placeholder-${index}`}
                    className="w-[var(--ds-card-width)] h-[var(--ds-card-height)] rounded-2xl animate-pulse opacity-70 bg-[var(--ds-color-surface)]"
                  />
                ))
              : movies.map((movie) => (
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
              disabled={!canGoPrev || isPageTransitionPending}
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
                  onClick={() => setPage(pageNumber)}
                  disabled={isActive || isPageTransitionPending}
                  aria-current={isActive ? "page" : undefined}
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
              disabled={!canGoNext || isPageTransitionPending}
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
