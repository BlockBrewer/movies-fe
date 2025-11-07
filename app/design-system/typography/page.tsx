import { AuthLayout } from "@/components/auth-layout"

export default function TypographyPage() {
  return (
    <AuthLayout>
      <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12 sm:mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">Typography</h1>
            <div className="h-1 w-20 bg-gradient-to-r from-green-400 to-transparent"></div>
          </div>

          {/* Montserrat Section */}
          <div className="mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4">Montserrat</h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-8">
              Geometric sans serif typefaces have been a popular design tool ever since these actors took to the
              world&apos;s stage. Poppins is one of the new corners to this long tradition. With support for the
              Devanagari and Latin writing systems, it is an internationalist take on the genre.
            </p>

            {/* Font Weights */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              {[
                { weight: "Bold", label: "Montserrat" },
                { weight: "SemiBold", label: "Montserrat" },
                { weight: "Regular", label: "Montserrat" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 bg-teal-800 bg-opacity-40 rounded-lg">
                  <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-2xl">Aa</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">{item.label}</p>
                    <p className="text-gray-400 text-sm">{item.weight}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Font Styles Table */}
          <div className="mb-12">
            <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-6">Font Styles</h3>

            {/* Desktop Table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-teal-700">
                    <th className="text-left py-4 px-4 text-gray-400 text-sm font-medium">STYLE NAME</th>
                    <th className="text-left py-4 px-4 text-gray-400 text-sm font-medium">FONT FAMILY/WEIGHT</th>
                    <th className="text-left py-4 px-4 text-gray-400 text-sm font-medium">
                      FONT SIZE/LINE HEIGHT/LETTER SPACING
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "Heading One", family: "Montserrat/SemiBold", size: "64px / 80px / 0%" },
                    { name: "Heading Two", family: "Montserrat/SemiBold", size: "48px / 56px / 0%" },
                    { name: "Heading Three", family: "Montserrat/SemiBold", size: "32px / 40px / 0%" },
                    { name: "Heading Four", family: "Montserrat/Bold", size: "24px / 32px / 0%" },
                    { name: "Heading Five", family: "Montserrat/Bold", size: "20px / 24px / 0%" },
                    { name: "Heading six", family: "Montserrat/Bold", size: "16px / 24px / 0%" },
                    { name: "Body - Large", family: "Montserrat/Regular", size: "20px / 32px / 0%" },
                    { name: "Body - Regular", family: "Montserrat/Regular", size: "16px / 24px / 0%" },
                    { name: "Body - Small", family: "Montserrat/Regular", size: "14px / 24px / 0%" },
                    { name: "Body - Extra Small", family: "Montserrat/Regular", size: "12px / 24px / 0%" },
                    { name: "Caption", family: "Montserrat/Regular", size: "14px / 16px / 0%" },
                  ].map((item, idx) => (
                    <tr key={idx} className="border-b border-teal-800 hover:bg-teal-800 hover:bg-opacity-20">
                      <td className="py-4 px-4 text-white font-medium">{item.name}</td>
                      <td className="py-4 px-4 text-gray-300">{item.family}</td>
                      <td className="py-4 px-4 text-gray-300">{item.size}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile List */}
            <div className="sm:hidden space-y-4">
              {[
                { name: "Heading One", family: "Montserrat/SemiBold", size: "64px / 80px / 0%" },
                { name: "Heading Two", family: "Montserrat/SemiBold", size: "48px / 56px / 0%" },
                { name: "Heading Three", family: "Montserrat/SemiBold", size: "32px / 40px / 0%" },
                { name: "Heading Four", family: "Montserrat/Bold", size: "24px / 32px / 0%" },
                { name: "Heading Five", family: "Montserrat/Bold", size: "20px / 24px / 0%" },
                { name: "Body - Large", family: "Montserrat/Regular", size: "20px / 32px / 0%" },
              ].map((item, idx) => (
                <div key={idx} className="p-4 bg-teal-800 bg-opacity-30 rounded-lg">
                  <p className="text-white font-semibold mb-2">{item.name}</p>
                  <p className="text-gray-400 text-sm mb-1">{item.family}</p>
                  <p className="text-gray-400 text-sm">{item.size}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}
