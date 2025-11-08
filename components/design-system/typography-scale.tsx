import type { TypographyStyle } from "@/lib/design-system/typography"

interface TypographyScaleProps {
  styles: TypographyStyle[]
}

export function TypographyScale({ styles }: TypographyScaleProps) {
  return (
    <div className="mb-12">
      <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-6">Font Styles</h3>

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
            {styles.map((item) => (
              <tr
                key={item.name}
                className="border-b border-teal-800 hover:bg-teal-800 hover:bg-opacity-20 transition-colors"
              >
                <td className="py-4 px-4 text-white font-medium">{item.name}</td>
                <td className="py-4 px-4 text-gray-300">{item.family}</td>
                <td className="py-4 px-4 text-gray-300">{item.size}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="sm:hidden space-y-4">
        {styles.slice(0, 6).map((item) => (
          <div key={item.name} className="p-4 bg-teal-800 bg-opacity-30 rounded-lg">
            <p className="text-white font-semibold mb-2">{item.name}</p>
            <p className="text-gray-400 text-sm mb-1">{item.family}</p>
            <p className="text-gray-400 text-sm">{item.size}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

