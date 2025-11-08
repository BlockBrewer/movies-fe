import type { TypographyWeight } from "@/lib/design-system/typography"

interface TypographyWeightGridProps {
  weights: TypographyWeight[]
}

export function TypographyWeightGrid({ weights }: TypographyWeightGridProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
      {weights.map((item) => (
        <div key={`${item.label}-${item.weight}`} className="flex items-center gap-3 p-4 bg-teal-800 bg-opacity-40 rounded-lg">
          <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-2xl" style={{ fontWeight: `var(${item.variable}, 700)` }}>
              Aa
            </span>
          </div>
          <div>
            <p className="text-white font-semibold">{item.label}</p>
            <p className="text-gray-400 text-sm">{item.weight}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

