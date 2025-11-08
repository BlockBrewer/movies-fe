export interface ColorToken {
  name: string
  className: string
  hex: string
}

export const colorTokens: ColorToken[] = [
  { name: "Primary", className: "bg-[var(--ds-color-primary)]", hex: "#2BD17E" },
  { name: "Primary Hover", className: "bg-[var(--ds-color-primary-hover)]", hex: "#24B870" },
  { name: "Background", className: "bg-[var(--ds-color-background)]", hex: "#093545" },
  { name: "Surface", className: "bg-[var(--ds-color-surface)]", hex: "#092C39" },
  { name: "Surface Accent", className: "bg-[var(--ds-color-surface-accent)]", hex: "#0A4A5F" },
  { name: "Input", className: "bg-[var(--ds-color-input)]", hex: "#224957" },
  { name: "Text", className: "bg-[var(--ds-color-text)]", hex: "#FFFFFF" },
]

