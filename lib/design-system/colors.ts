export interface ColorToken {
  name: string
  variable: string
  hex: string
}

export const colorTokens: ColorToken[] = [
  { name: "Primary", variable: "--ds-color-primary", hex: "#2BD17E" },
  { name: "Primary Hover", variable: "--ds-color-primary-hover", hex: "#24B870" },
  { name: "Background", variable: "--ds-color-background", hex: "#093545" },
  { name: "Surface", variable: "--ds-color-surface", hex: "#092C39" },
  { name: "Surface Accent", variable: "--ds-color-surface-accent", hex: "#0A4A5F" },
  { name: "Input", variable: "--ds-color-input", hex: "#224957" },
  { name: "Text", variable: "--ds-color-text", hex: "#FFFFFF" },
]

