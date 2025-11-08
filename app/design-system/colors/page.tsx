import { ColorSwatch } from "@/components/design-system/color-swatch"
import { DesignSystemPage } from "@/components/design-system/design-system-page"
import { colorTokens } from "@/lib/design-system/colors"

export default function ColorsPage() {
  return (
    <DesignSystemPage title="Colors" maxWidthClassName="max-w-2xl">
      <div className="space-y-8 sm:space-y-10">
        {colorTokens.map((token) => (
          <ColorSwatch key={token.name} name={token.name} className={token.className} hex={token.hex} />
        ))}
      </div>
    </DesignSystemPage>
  )
}
