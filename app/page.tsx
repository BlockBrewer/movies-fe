"use client";

import type React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";

import { AuthLayout } from "@/components/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useApp } from "@/components/providers/app-provider";
import { useAutofillBackground } from "@/hooks/use-autofill-background";
import { useSignInForm } from "@/hooks/use-sign-in-form";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const t = useTranslations("auth.signIn");
  const router = useRouter();
  const { signIn, signOut, user } = useApp();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const authService = useMemo(
    () => ({
      signIn,
      signOut,
    }),
    [signIn, signOut]
  );

  const { state, toggleRememberMe, updateEmail, updatePassword } =
    useSignInForm({
      service: authService,
      onSuccess: () => {
        router.push("/movies");
      },
    });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const handleLoginClick = async (
    e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.currentTarget instanceof HTMLFormElement) {
      e.preventDefault();
      return false;
    }

    const email = state.credentials.email;
    const password = state.credentials.password;

    if (!email || !password) {
      setError(t("emailPasswordRequired"));
      return false;
    }

    setIsSubmitting(true);
    setError(undefined);

    try {
      const result = await signIn({
        email,
        password,
        rememberMe: state.credentials.rememberMe,
      });

      if (result.success) {
        router.push("/movies");
        return false;
      } else {
        setError(result.message || t("loginFailed"));
        setIsSubmitting(false);
        return false;
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : t("unexpectedError"));
      setIsSubmitting(false);
      return false;
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    await handleLoginClick(e as any);
    return false;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      handleLoginClick(e);
    }
  };

  const inputRefs = useMemo(() => [emailRef, passwordRef], []);
  useAutofillBackground(inputRefs);

  useEffect(() => {
    if (user) {
      router.replace("/movies");
    }
  }, [router, user]);

  return (
    <AuthLayout>
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-white mb-12">
              {t("title")}
            </h1>

            <form onSubmit={handleFormSubmit} className="space-y-6" noValidate>
              {(error || state.error) && (
                <div className="rounded-md bg-red-900/20 border border-red-500/50 p-3">
                  <p className="text-sm text-red-300">{error || state.error}</p>
                </div>
              )}

              <Input
                ref={emailRef}
                type="email"
                placeholder={t("email")}
                value={state.credentials.email}
                onChange={(event) => updateEmail(event.target.value)}
                onKeyDown={handleKeyDown}
                className="placeholder-gray-300"
                autoComplete="email"
              />

              <Input
                ref={passwordRef}
                type="password"
                placeholder={t("password")}
                value={state.credentials.password}
                onChange={(event) => updatePassword(event.target.value)}
                onKeyDown={handleKeyDown}
                className="placeholder-gray-300"
                autoComplete="current-password"
              />

              <div className="flex items-center justify-center">
                <div className="relative">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={state.credentials.rememberMe}
                    onChange={(event) => toggleRememberMe(event.target.checked)}
                    className="ds-checkbox w-5 h-5 rounded cursor-pointer appearance-none checked:bg-[var(--ds-color-input)]"
                  />
                  {state.credentials.rememberMe && (
                    <Check className="absolute top-0 left-0 w-5 h-5 pointer-events-none text-[var(--ds-color-primary)] stroke-[3]" />
                  )}
                </div>
                <label
                  htmlFor="remember"
                  className="ml-3 text-gray-200 cursor-pointer font-medium"
                >
                  {t("rememberMe")}
                </label>
              </div>

              <Button
                type="button"
                size="form"
                disabled={isSubmitting || state.isSubmitting}
                onClick={handleLoginClick}
                className="w-full font-bold"
              >
                {isSubmitting || state.isSubmitting
                  ? t("signingIn")
                  : t("loginButton")}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
