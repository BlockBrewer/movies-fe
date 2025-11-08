import type { FormEvent } from "react";
import { useCallback, useMemo, useState } from "react";

import type { AuthService } from "@/lib/auth/auth-service";
import type { SignInCredentials } from "@/lib/auth/types";

interface UseSignInFormOptions {
  service: AuthService;
  onSuccess?: (credentials: SignInCredentials) => void;
}

interface SignInState {
  credentials: SignInCredentials;
  isSubmitting: boolean;
  error?: string;
}

const initialState: SignInState = {
  credentials: {
    email: "",
    password: "",
    rememberMe: false,
  },
  isSubmitting: false,
};

export function useSignInForm(options: UseSignInFormOptions) {
  const { service: authService, onSuccess } = options;
  const [state, setState] = useState<SignInState>(initialState);

  const updateCredentials = useCallback(
    <K extends keyof SignInCredentials>(
      key: K,
      value: SignInCredentials[K]
    ) => {
      setState((prev) => ({
        ...prev,
        credentials: {
          ...prev.credentials,
          [key]: value,
        },
      }));
    },
    []
  );

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      setState((prev) => ({ ...prev, isSubmitting: true, error: undefined }));

      try {
        const result = await authService.signIn(state.credentials);

        if (!result.success) {
          setState((prev) => ({
            ...prev,
            isSubmitting: false,
            error: result.message ?? "Unable to sign in",
          }));
          return;
        }

        onSuccess?.(state.credentials);
        setState((prev) => ({
          ...prev,
          isSubmitting: false,
          error: undefined,
        }));

        if (!state.credentials.rememberMe) {
          reset();
        }
      } catch (error) {
        setState((prev) => ({
          ...prev,
          isSubmitting: false,
          error:
            error instanceof Error
              ? error.message
              : "An unexpected error occurred",
        }));
      }
    },
    [authService, onSuccess, reset, state.credentials]
  );

  const handlers = useMemo(
    () => ({
      handleSubmit,
      updateEmail: (email: string) => updateCredentials("email", email),
      updatePassword: (password: string) =>
        updateCredentials("password", password),
      toggleRememberMe: (rememberMe: boolean) =>
        updateCredentials("rememberMe", rememberMe),
      reset,
    }),
    [handleSubmit, reset, updateCredentials]
  );

  return {
    state,
    ...handlers,
  };
}
