export interface TypographyWeight {
  weight: string
  label: string
}

export interface TypographyStyle {
  name: string
  family: string
  size: string
}

export const typographyWeights: TypographyWeight[] = [
  { weight: "Bold", label: "Montserrat" },
  { weight: "SemiBold", label: "Montserrat" },
  { weight: "Regular", label: "Montserrat" },
]

export const typographyStyles: TypographyStyle[] = [
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
]

