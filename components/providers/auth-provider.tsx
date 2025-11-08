"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { authService } from "@/lib/api/services";
import { tokenStorage } from "@/lib/api/token-storage";
import type { User } from "@/lib/api/types";

interface AuthContextValue {
  user: Partial<User> | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: Partial<User> | null) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const PUBLIC_ROUTES = ["/", "/login", "/register", "/design-system"];

function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<Partial<User> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const initAuth = () => {
      try {
        if (tokenStorage.isAuthenticated()) {
          const currentUser = authService.getCurrentUser();
          setUser(currentUser);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Failed to initialize auth:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const isPublic = isPublicRoute(pathname);
    const isAuth = tokenStorage.isAuthenticated();

    if (!isPublic && !isAuth) {
      router.replace("/");
    }

    if (pathname === "/" && isAuth) {
      router.replace("/movies");
    }
  }, [pathname, isLoading, router]);

  useEffect(() => {
    if (isLoading) return;

    const isPublic = isPublicRoute(pathname);
    const isAuth = tokenStorage.isAuthenticated();

    if (!user && !isPublic && !isAuth) {
      router.replace("/");
    }
  }, [user, pathname, isLoading, router]);

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const value: AuthContextValue = {
    user,
    isAuthenticated: !!user && tokenStorage.isAuthenticated(),
    isLoading,
    setUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
