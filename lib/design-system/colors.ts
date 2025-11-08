export interface ColorToken {
  name: string
  className: string
  hex: string
}

export const colorTokens: ColorToken[] = [
  { name: "Primary", className: "bg-green-400", hex: "#2ECC71" },
  { name: "Error", className: "bg-red-400", hex: "#FF6B6B" },
  { name: "Background color", className: "bg-teal-700", hex: "#0F7478" },
  { name: "Input color", className: "bg-teal-600", hex: "#1A8B96" },
  { name: "Card color", className: "bg-teal-800", hex: "#0D5961" },
]

