"use client";

import {
  createContext,
  useContext,
  type ReactNode,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  useState,
} from "react";
import { useTranslations } from "next-intl";
import { useAuth } from "./auth-provider";
import {
  useMovies,
  useCreateMovieWithUpload,
  useUpdateMovie,
  useDeleteMovie,
  useLogin,
  useLogout,
} from "@/lib/api/hooks";
import { toast } from "@/hooks/use-toast";
import type { SignInCredentials, SignInResult } from "@/lib/auth/types";
import type { Movie as OldMovie } from "@/lib/movies/types";
import type {
  Movie as ApiMovie,
  CreateMovieWithUploadRequest,
  UpdateMovieRequest,
  PaginatedResponse,
} from "@/lib/api/types";

interface User {
  email: string;
}

interface MovieDraft {
  title: string;
  year: number;
  image: string;
}

const MOVIES_PAGE_SIZE = 8;

interface AppContextValue {
  user: User | null;
  signIn: (credentials: SignInCredentials) => Promise<SignInResult>;
  signOut: () => Promise<void>;
  movies: OldMovie[];
  moviesTotal: number;
  moviesPage: number;
  moviesLimit: number;
  setMoviesPage: (page: number) => void;
  isFetchingMovies: boolean;
  refetchMovies: () => Promise<void>;
  createMovie: (draft: MovieDraft) => Promise<OldMovie>;
  updateMovie: (id: number, draft: MovieDraft) => Promise<OldMovie>;
  deleteMovie: (id: number) => Promise<void>;
  getMovie: (id: number) => OldMovie | undefined;
  isLoading: boolean;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

function convertApiMovieToOld(movie: ApiMovie, numericId: number): OldMovie {
  return {
    id: numericId,
    title: movie.title,
    year: movie.publishingYear,
    image: movie.posterUrl,
  };
}

export function AppProvider({ children }: { children: ReactNode }) {
  const t = useTranslations();
  const auth = useAuth();
  const loginMutation = useLogin();
  const logoutMutation = useLogout();
  const [moviesPage, setMoviesPage] = useState(1);
  const moviesLimit = MOVIES_PAGE_SIZE;
  const uuidToNumericRef = useRef<Map<string, number>>(new Map());
  const numericToUuidRef = useRef<Map<number, string>>(new Map());
  const nextNumericIdRef = useRef<number>(1);

  const clearIdMappings = useCallback(() => {
    uuidToNumericRef.current.clear();
    numericToUuidRef.current.clear();
    nextNumericIdRef.current = 1;
  }, []);

  const getNumericId = useCallback((uuid: string): number => {
    const existing = uuidToNumericRef.current.get(uuid);
    if (existing != null) {
      return existing;
    }
    const assigned = nextNumericIdRef.current;
    nextNumericIdRef.current += 1;
    uuidToNumericRef.current.set(uuid, assigned);
    numericToUuidRef.current.set(assigned, uuid);
    return assigned;
  }, []);

  const getUuidId = useCallback((numericId: number): string | undefined => {
    return numericToUuidRef.current.get(numericId);
  }, []);

  const removeNumericId = useCallback((numericId: number) => {
    const uuid = numericToUuidRef.current.get(numericId);
    if (!uuid) {
      return;
    }
    numericToUuidRef.current.delete(numericId);
    uuidToNumericRef.current.delete(uuid);
  }, []);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      clearIdMappings();
      setMoviesPage(1);
    }
  }, [auth.isAuthenticated, clearIdMappings, setMoviesPage]);

  // Fetch movies only when authenticated
  const moviesQuery = useMovies(
    { page: moviesPage, limit: moviesLimit },
    {
      enabled: auth.isAuthenticated,
    }
  );
  const { isLoading, isFetching: isFetchingMovies, refetch: refetchMoviesQuery } = moviesQuery;
  const moviesResult = moviesQuery.data as PaginatedResponse<ApiMovie> | undefined;
  const apiMovies: ApiMovie[] = moviesResult?.data ?? [];
  const totalMovies = moviesResult?.total ?? 0;
  const totalPages = useMemo(
    () => Math.max(Math.ceil(totalMovies / moviesLimit), 1),
    [totalMovies, moviesLimit]
  );

  useEffect(() => {
    if (moviesPage > totalPages) {
      setMoviesPage(totalPages);
    }
  }, [moviesPage, totalPages]);

  const setMoviesPageSafe = useCallback(
    (page: number) => {
      setMoviesPage((prev) => {
        const bounded = Math.max(1, Math.min(page, totalPages));
        return bounded === prev ? prev : bounded;
      });
    },
    [totalPages]
  );

  const movies: OldMovie[] = useMemo(
    () =>
      apiMovies.map((movie: ApiMovie) => {
        const numId = getNumericId(movie.id);
        return convertApiMovieToOld(movie, numId);
      }),
    [apiMovies, getNumericId]
  );

  const createMovieMutation = useCreateMovieWithUpload();
  const updateMovieMutation = useUpdateMovie();
  const deleteMovieMutation = useDeleteMovie();

  const refetchMovies = useCallback(async () => {
    await refetchMoviesQuery();
  }, [refetchMoviesQuery]);

  const signIn = async (
    credentials: SignInCredentials
  ): Promise<SignInResult> => {
    try {
      const response = await loginMutation.mutateAsync({
        email: credentials.email,
        password: credentials.password,
      });

      const currentUser = await import("@/lib/api/services").then((m) =>
        m.authService.getCurrentUser()
      );

      if (currentUser) {
        auth.setUser(currentUser);
      } else {
        auth.setUser({
          email: credentials.email,
          id: "",
          fullName: "",
          roles: [] as any[],
        });
      }

      if (typeof window !== "undefined") {
        sessionStorage.setItem("justLoggedIn", "true");
      }

      return { success: true };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Login failed";

      return {
        success: false,
        message,
      };
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      await logoutMutation.mutateAsync();

      if (typeof window !== "undefined") {
        sessionStorage.removeItem("justLoggedIn");
      }

      auth.setUser(null);
      clearIdMappings();
      setMoviesPage(1);

      toast({
        title: t("auth.logout.title"),
        description: t("auth.logout.description"),
        variant: "default",
      });
    } catch (error) {
      toast({
        title: t("auth.logout.failed"),
        description:
          error instanceof Error ? error.message : t("auth.logout.failed"),
        variant: "destructive",
      });
      throw error;
    }
  };

  const createMovie = async (draft: MovieDraft): Promise<OldMovie> => {
    try {
      let posterFile: File | undefined;

      if (draft.image.startsWith("blob:")) {
        try {
          const response = await fetch(draft.image);
          const blob = await response.blob();
          posterFile = new File([blob], "poster.jpg", { type: blob.type });
        } catch (error) {
          console.error("Failed to convert blob to file:", error);
        }
      }

      const data: CreateMovieWithUploadRequest = {
        title: draft.title,
        publishingYear: draft.year,
        poster: posterFile,
      };

      const newMovie = await createMovieMutation.mutateAsync(data);
      const numericId = getNumericId(newMovie.id);
      setMoviesPageSafe(1);

      toast({
        title: t("movies.toast.created.title"),
        description: t("movies.toast.created.description", {
          title: draft.title,
        }),
        variant: "default",
      });

      return convertApiMovieToOld(newMovie, numericId);
    } catch (error) {
      toast({
        title: t("movies.toast.createFailed.title"),
        description:
          error instanceof Error
            ? error.message
            : t("movies.toast.createFailed.description"),
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateMovie = async (
    id: number,
    draft: MovieDraft
  ): Promise<OldMovie> => {
    try {
      const uuid = getUuidId(id);
      if (!uuid) {
        throw new Error(t("movies.toast.notFound"));
      }

      let posterFile: File | undefined;

      if (draft.image.startsWith("blob:")) {
        try {
          const response = await fetch(draft.image);
          const blob = await response.blob();
          posterFile = new File([blob], "poster.jpg", { type: blob.type });
        } catch (error) {
          console.error("Failed to convert blob to file:", error);
        }
      }

      const data: UpdateMovieRequest = {
        title: draft.title,
        publishingYear: draft.year,
        ...(posterFile && { poster: posterFile }),
      };

      const updatedMovie = await updateMovieMutation.mutateAsync({
        id: uuid,
        data,
      });
      const numericId = getNumericId(updatedMovie.id);

      toast({
        title: t("movies.toast.updated.title"),
        description: t("movies.toast.updated.description", {
          title: draft.title,
        }),
        variant: "default",
      });

      return convertApiMovieToOld(updatedMovie, numericId);
    } catch (error) {
      toast({
        title: t("movies.toast.updateFailed.title"),
        description:
          error instanceof Error
            ? error.message
            : t("movies.toast.updateFailed.description"),
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteMovie = async (id: number): Promise<void> => {
    try {
      const uuid = getUuidId(id);
      if (!uuid) {
        throw new Error(t("movies.toast.notFound"));
      }

      const movie = movies.find((movieItem) => movieItem.id === id);
      const movieTitle = movie?.title || "Movie";

      await deleteMovieMutation.mutateAsync(uuid);
      removeNumericId(id);

      toast({
        title: t("movies.toast.deleted.title"),
        description: t("movies.toast.deleted.description", {
          title: movieTitle,
        }),
        variant: "default",
      });
    } catch (error) {
      toast({
        title: t("movies.toast.deleteFailed.title"),
        description:
          error instanceof Error
            ? error.message
            : t("movies.toast.deleteFailed.description"),
        variant: "destructive",
      });
      throw error;
    }
  };

  const getMovie = (id: number): OldMovie | undefined => {
    return movies.find((movieItem) => movieItem.id === id);
  };

  const value: AppContextValue = {
    user: auth.user ? { email: auth.user.email || "" } : null,
    signIn,
    signOut,
    movies,
    moviesTotal: totalMovies,
    moviesPage,
    moviesLimit,
    setMoviesPage: setMoviesPageSafe,
    isFetchingMovies,
    refetchMovies,
    createMovie,
    updateMovie,
    deleteMovie,
    getMovie,
    isLoading,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
