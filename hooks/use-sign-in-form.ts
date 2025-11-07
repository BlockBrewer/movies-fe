import type { FormEvent } from 'react'
import { useCallback, useMemo, useState } from 'react'

import type { AuthService } from '@/lib/auth/auth-service'
import { mockAuthService } from '@/lib/auth/mock-auth-service'
import type { SignInCredentials } from '@/lib/auth/types'

interface UseSignInFormOptions {
  service?: AuthService
}

interface SignInState {
  credentials: SignInCredentials
  isSubmitting: boolean
  error?: string
}

const initialState: SignInState = {
  credentials: {
    email: '',
    password: '',
    rememberMe: false,
  },
  isSubmitting: false,
}

export function useSignInForm(options: UseSignInFormOptions = {}) {
  const authService = options.service ?? mockAuthService
  const [state, setState] = useState<SignInState>(initialState)

  const updateCredentials = useCallback(<K extends keyof SignInCredentials>(key: K, value: SignInCredentials[K]) => {
    setState((prev) => ({
      ...prev,
      credentials: {
        ...prev.credentials,
        [key]: value,
      },
    }))
  }, [])

  const reset = useCallback(() => {
    setState(initialState)
  }, [])

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      setState((prev) => ({ ...prev, isSubmitting: true, error: undefined }))

      const result = await authService.signIn(state.credentials)

      if (!result.success) {
        setState((prev) => ({
          ...prev,
          isSubmitting: false,
          error: result.message ?? 'Unable to sign in',
        }))
        return
      }

      setState((prev) => ({ ...prev, isSubmitting: false, error: undefined }))

      if (!state.credentials.rememberMe) {
        reset()
      }
    },
    [authService, reset, state.credentials],
  )

  const handlers = useMemo(
    () => ({
      handleSubmit,
      updateEmail: (email: string) => updateCredentials('email', email),
      updatePassword: (password: string) => updateCredentials('password', password),
      toggleRememberMe: (rememberMe: boolean) => updateCredentials('rememberMe', rememberMe),
      reset,
    }),
    [handleSubmit, reset, updateCredentials],
  )

  return {
    state,
    ...handlers,
  }
}

