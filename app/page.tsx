"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Check } from "lucide-react"
import { AuthLayout } from "@/components/auth-layout"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const fixAutofill = () => {
      [emailRef.current, passwordRef.current].forEach((input) => {
        if (input) {
          input.style.setProperty("background-color", "#224957", "important")
          input.style.setProperty("-webkit-box-shadow", "0 0 0 1000px #224957 inset", "important")
          input.style.setProperty("box-shadow", "0 0 0 1000px #224957 inset", "important")
        }
      })
    }

    // Check periodically
    const interval = setInterval(fixAutofill, 100)
    const timeouts = [0, 100, 300, 500, 1000, 2000]
    timeouts.forEach((delay) => setTimeout(fixAutofill, delay))

    return () => {
      clearInterval(interval)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login attempt:", { email, password, rememberMe })
  }

  return (
    <AuthLayout>
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="text-center">
            {/* Title */}
            <h1 className="text-6xl font-bold text-white mb-12">Sign in</h1>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Input */}
              <input
                ref={emailRef}
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-4 bg-[#224957] text-white placeholder-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2BD17E] transition"
                style={{
                  backgroundColor: "#224957",
                  WebkitBoxShadow: "0 0 0 1000px #224957 inset",
                  boxShadow: "0 0 0 1000px #224957 inset",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.setProperty("background-color", "#224957", "important")
                  e.currentTarget.style.setProperty("-webkit-box-shadow", "0 0 0 1000px #224957 inset", "important")
                  e.currentTarget.style.setProperty("box-shadow", "0 0 0 1000px #224957 inset", "important")
                }}
              />

              {/* Password Input */}
              <input
                ref={passwordRef}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-4 bg-[#224957] text-white placeholder-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2BD17E] transition"
                style={{
                  backgroundColor: "#224957",
                  WebkitBoxShadow: "0 0 0 1000px #224957 inset",
                  boxShadow: "0 0 0 1000px #224957 inset",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.setProperty("background-color", "#224957", "important")
                  e.currentTarget.style.setProperty("-webkit-box-shadow", "0 0 0 1000px #224957 inset", "important")
                  e.currentTarget.style.setProperty("box-shadow", "0 0 0 1000px #224957 inset", "important")
                }}
              />

              {/* Remember Me */}
              <div className="flex items-center justify-center">
                <div className="relative">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-5 h-5 rounded cursor-pointer appearance-none checked:bg-[#224957]"
                    style={{
                      backgroundColor: "#224957",
                      background: "#224957",
                    }}
                  />
                  {rememberMe && (
                    <Check className="absolute top-0 left-0 w-5 h-5 pointer-events-none text-[#2BD17E] stroke-[3]" />
                  )}
                </div>
                <label htmlFor="remember" className="ml-3 text-gray-200 cursor-pointer font-medium">
                  Remember me
                </label>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full px-6 py-4 bg-[#2BD17E] hover:bg-[#24b870] text-white font-bold text-lg rounded-lg transition duration-200"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}
