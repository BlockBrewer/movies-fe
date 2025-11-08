export interface TypographyWeight {
  weight: string
  label: string
  variable: string
}

interface TypographyStyleVariables {
  fontFamily: string
  fontWeight: string
  fontSize: string
  lineHeight: string
  letterSpacing: string
}

export interface TypographyStyle {
  name: string
  family: string
  size: string
  variables: TypographyStyleVariables
}

export const typographyWeights: TypographyWeight[] = [
  { weight: "Bold", label: "Montserrat", variable: "--ds-font-weight-bold" },
  { weight: "SemiBold", label: "Montserrat", variable: "--ds-font-weight-semibold" },
  { weight: "Regular", label: "Montserrat", variable: "--ds-font-weight-regular" },
]

export const typographyStyles: TypographyStyle[] = [
  {
    name: "Heading One",
    family: "Montserrat/SemiBold",
    size: "4rem / 5rem / 0%",
    variables: {
      fontFamily: "--ds-font-family-base",
      fontWeight: "--ds-font-weight-semibold",
      fontSize: "--ds-font-size-heading-1",
      lineHeight: "--ds-line-height-heading-1",
      letterSpacing: "--ds-letter-spacing-heading-1",
    },
  },
  {
    name: "Heading Two",
    family: "Montserrat/SemiBold",
    size: "3rem / 3.5rem / 0%",
    variables: {
      fontFamily: "--ds-font-family-base",
      fontWeight: "--ds-font-weight-semibold",
      fontSize: "--ds-font-size-heading-2",
      lineHeight: "--ds-line-height-heading-2",
      letterSpacing: "--ds-letter-spacing-heading-2",
    },
  },
  {
    name: "Heading Three",
    family: "Montserrat/SemiBold",
    size: "2rem / 2.5rem / 0%",
    variables: {
      fontFamily: "--ds-font-family-base",
      fontWeight: "--ds-font-weight-semibold",
      fontSize: "--ds-font-size-heading-3",
      lineHeight: "--ds-line-height-heading-3",
      letterSpacing: "--ds-letter-spacing-heading-3",
    },
  },
  {
    name: "Heading Four",
    family: "Montserrat/Bold",
    size: "1.5rem / 2rem / 0%",
    variables: {
      fontFamily: "--ds-font-family-base",
      fontWeight: "--ds-font-weight-bold",
      fontSize: "--ds-font-size-heading-4",
      lineHeight: "--ds-line-height-heading-4",
      letterSpacing: "--ds-letter-spacing-heading-4",
    },
  },
  {
    name: "Heading Five",
    family: "Montserrat/Bold",
    size: "1.25rem / 1.5rem / 0%",
    variables: {
      fontFamily: "--ds-font-family-base",
      fontWeight: "--ds-font-weight-bold",
      fontSize: "--ds-font-size-heading-5",
      lineHeight: "--ds-line-height-heading-5",
      letterSpacing: "--ds-letter-spacing-heading-5",
    },
  },
  {
    name: "Heading six",
    family: "Montserrat/Bold",
    size: "1rem / 1.5rem / 0%",
    variables: {
      fontFamily: "--ds-font-family-base",
      fontWeight: "--ds-font-weight-bold",
      fontSize: "--ds-font-size-heading-6",
      lineHeight: "--ds-line-height-heading-6",
      letterSpacing: "--ds-letter-spacing-heading-6",
    },
  },
  {
    name: "Body - Large",
    family: "Montserrat/Regular",
    size: "1.25rem / 2rem / 0%",
    variables: {
      fontFamily: "--ds-font-family-base",
      fontWeight: "--ds-font-weight-regular",
      fontSize: "--ds-font-size-body-large",
      lineHeight: "--ds-line-height-body-large",
      letterSpacing: "--ds-letter-spacing-body-large",
    },
  },
  {
    name: "Body - Regular",
    family: "Montserrat/Regular",
    size: "1rem / 1.5rem / 0%",
    variables: {
      fontFamily: "--ds-font-family-base",
      fontWeight: "--ds-font-weight-regular",
      fontSize: "--ds-font-size-body-regular",
      lineHeight: "--ds-line-height-body-regular",
      letterSpacing: "--ds-letter-spacing-body-regular",
    },
  },
  {
    name: "Body - Small",
    family: "Montserrat/Regular",
    size: "0.875rem / 1.5rem / 0%",
    variables: {
      fontFamily: "--ds-font-family-base",
      fontWeight: "--ds-font-weight-regular",
      fontSize: "--ds-font-size-body-small",
      lineHeight: "--ds-line-height-body-small",
      letterSpacing: "--ds-letter-spacing-body-small",
    },
  },
  {
    name: "Body - Extra Small",
    family: "Montserrat/Regular",
    size: "0.75rem / 1.5rem / 0%",
    variables: {
      fontFamily: "--ds-font-family-base",
      fontWeight: "--ds-font-weight-regular",
      fontSize: "--ds-font-size-body-xs",
      lineHeight: "--ds-line-height-body-xs",
      letterSpacing: "--ds-letter-spacing-body-xs",
    },
  },
  {
    name: "Caption",
    family: "Montserrat/Regular",
    size: "0.875rem / 1rem / 0%",
    variables: {
      fontFamily: "--ds-font-family-base",
      fontWeight: "--ds-font-weight-regular",
      fontSize: "--ds-font-size-caption",
      lineHeight: "--ds-line-height-caption",
      letterSpacing: "--ds-letter-spacing-caption",
    },
  },
]

