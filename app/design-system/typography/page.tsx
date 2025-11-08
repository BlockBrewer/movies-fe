import { DesignSystemPage } from "@/components/design-system/design-system-page"
import { TypographyScale } from "@/components/design-system/typography-scale"
import { TypographyWeightGrid } from "@/components/design-system/typography-weight-grid"
import { typographyStyles, typographyWeights } from "@/lib/design-system/typography"

export default function TypographyPage() {
  return (
    <DesignSystemPage title="Typography">
      <section className="mb-12 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4">Montserrat</h2>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-8">
          Geometric sans serif typefaces have been a popular design tool ever since these actors took to the world&apos;s
          stage. Poppins is one of the new corners to this long tradition. With support for the Devanagari and Latin
          writing systems, it is an internationalist take on the genre.
        </p>
        <TypographyWeightGrid weights={typographyWeights} />
      </section>

      <TypographyScale styles={typographyStyles} />
    </DesignSystemPage>
  )
}
