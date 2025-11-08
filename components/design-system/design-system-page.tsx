import type { ReactNode } from "react"

import { AuthLayout } from "@/components/auth-layout"

interface DesignSystemPageProps {
  title: string
  children: ReactNode
  description?: string
  maxWidthClassName?: string
}

export function DesignSystemPage({
  title,
  children,
  description,
  maxWidthClassName = "max-w-4xl",
}: DesignSystemPageProps) {
  return (
    <AuthLayout>
      <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className={`${maxWidthClassName} mx-auto`}>
          <header className="mb-12 sm:mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">{title}</h1>
            <div className="h-1 w-20 bg-gradient-to-r from-green-400 to-transparent" />
            {description ? (
              <p className="mt-4 text-gray-300 text-sm sm:text-base leading-relaxed">{description}</p>
            ) : null}
          </header>
          {children}
        </div>
      </div>
    </AuthLayout>
  )
}

