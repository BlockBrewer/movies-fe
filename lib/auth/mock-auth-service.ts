import type { AuthService } from './auth-service'
import type { SignInCredentials, SignInResult } from './types'

class MockAuthService implements AuthService {
  async signIn(credentials: SignInCredentials): Promise<SignInResult> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const emailValid = credentials.email.trim().length > 0
    const passwordValid = credentials.password.trim().length > 0

    return {
      success: emailValid && passwordValid,
      message: emailValid && passwordValid ? undefined : 'Invalid email or password',
    }
  }

  async signOut(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 150))
  }
}

export const mockAuthService = new MockAuthService()

