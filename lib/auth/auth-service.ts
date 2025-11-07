import type { SignInCredentials, SignInResult } from './types'

export interface AuthService {
  signIn(credentials: SignInCredentials): Promise<SignInResult>
  signOut(): Promise<void>
}

