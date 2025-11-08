import type React from "react"

interface AuthLayoutProps {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--ds-color-background)] via-[var(--ds-color-background)] to-[var(--ds-color-surface-accent)] relative overflow-hidden">
      {/* Main Content */}
      <div className="relative z-10">{children}</div>

      {/* Wavy Bottom Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* First wave */}
          <path
            style={{ fill: "color-mix(in srgb, var(--ds-color-surface) 60%, transparent)" }}
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,144C960,149,1056,139,1152,128C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
          {/* Second wave */}
          <path
            style={{ fill: "color-mix(in srgb, var(--ds-color-surface-accent) 50%, transparent)" }}
            d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,144C672,139,768,181,864,192C960,203,1056,181,1152,160C1248,139,1344,128,1392,122.7L1440,117L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>
    </div>
  )
}
