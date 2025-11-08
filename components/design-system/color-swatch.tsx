interface ColorSwatchProps {
  name: string
  className: string
  hex: string
}

export function ColorSwatch({ name, className, hex }: ColorSwatchProps) {
  return (
    <div>
      <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">{name}</h3>
      <div className={`w-full sm:w-80 h-24 sm:h-32 ${className} rounded-lg shadow-lg`} />
      <p className="text-gray-400 text-sm mt-2">{hex}</p>
    </div>
  )
}

