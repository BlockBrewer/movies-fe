"use client"

import type React from "react"
import { useMemo, useRef } from "react"
import { Check } from "lucide-react"

import { AuthLayout } from "@/components/auth-layout"
import { useAutofillBackground } from "@/hooks/use-autofill-background"
import { useSignInForm } from "@/hooks/use-sign-in-form"

export default function SignInPage() {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const { state, handleSubmit, toggleRememberMe, updateEmail, updatePassword } = useSignInForm()

  const inputRefs = useMemo(() => [emailRef, passwordRef], [])
  useAutofillBackground(inputRefs)

  return (
    <AuthLayout>
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-white mb-12">Sign in</h1>

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <input
                ref={emailRef}
                type="email"
                placeholder="Email"
                value={state.credentials.email}
                onChange={(event) => updateEmail(event.target.value)}
                className="w-full px-6 py-4 bg-[var(--ds-color-input)] text-[var(--ds-color-text)] placeholder-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--ds-color-primary)] transition"
                style={{
                  backgroundColor: "var(--ds-color-input)",
                  WebkitBoxShadow: "0 0 0 1000px var(--ds-color-input) inset",
                  boxShadow: "0 0 0 1000px var(--ds-color-input) inset",
                }}
              />

              <input
                ref={passwordRef}
                type="password"
                placeholder="Password"
                value={state.credentials.password}
                onChange={(event) => updatePassword(event.target.value)}
                className="w-full px-6 py-4 bg-[var(--ds-color-input)] text-[var(--ds-color-text)] placeholder-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--ds-color-primary)] transition"
                style={{
                  backgroundColor: "var(--ds-color-input)",
                  WebkitBoxShadow: "0 0 0 1000px var(--ds-color-input) inset",
                  boxShadow: "0 0 0 1000px var(--ds-color-input) inset",
                }}
              />

              <div className="flex items-center justify-center">
                <div className="relative">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={state.credentials.rememberMe}
                    onChange={(event) => toggleRememberMe(event.target.checked)}
                    className="w-5 h-5 rounded cursor-pointer appearance-none checked:bg-[var(--ds-color-input)]"
                    style={{
                      backgroundColor: "var(--ds-color-input)",
                      background: "var(--ds-color-input)",
                    }}
                  />
                  {state.credentials.rememberMe && (
                    <Check className="absolute top-0 left-0 w-5 h-5 pointer-events-none text-[var(--ds-color-primary)] stroke-[3]" />
                  )}
                </div>
                <label htmlFor="remember" className="ml-3 text-gray-200 cursor-pointer font-medium">
                  Remember me
                </label>
              </div>

              <button
                type="submit"
                disabled={state.isSubmitting}
                className="w-full px-6 py-4 bg-[var(--ds-color-primary)] hover:bg-[var(--ds-color-primary-hover)] text-[var(--ds-color-text)] font-bold text-lg rounded-lg transition duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {state.isSubmitting ? "Signing in..." : "Login"}
              </button>

              {state.error ? <p className="text-sm text-red-300">{state.error}</p> : null}
            </form>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}
