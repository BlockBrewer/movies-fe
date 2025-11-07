export interface SignInCredentials {
  email: string
  password: string
  rememberMe: boolean
}

export interface SignInResult {
  success: boolean
  message?: string
}

