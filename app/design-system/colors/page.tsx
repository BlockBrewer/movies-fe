import { AuthLayout } from "@/components/auth-layout"

export default function ColorsPage() {
  return (
    <AuthLayout>
      <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-12 sm:mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">Colors</h1>
            <div className="h-1 w-20 bg-gradient-to-r from-green-400 to-transparent"></div>
          </div>

          {/* Color Swatches */}
          <div className="space-y-8 sm:space-y-10">
            {[
              { name: "Primary", color: "bg-green-400", hex: "#2ECC71" },
              { name: "Error", color: "bg-red-400", hex: "#FF6B6B" },
              { name: "Background color", color: "bg-teal-700", hex: "#0F7478" },
              { name: "Input color", color: "bg-teal-600", hex: "#1A8B96" },
              { name: "Card color", color: "bg-teal-800", hex: "#0D5961" },
            ].map((item, idx) => (
              <div key={idx}>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">{item.name}</h3>
                <div className={`w-full sm:w-80 h-24 sm:h-32 ${item.color} rounded-lg shadow-lg`}></div>
                <p className="text-gray-400 text-sm mt-2">{item.hex}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}
