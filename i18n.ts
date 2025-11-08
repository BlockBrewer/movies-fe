import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

// Can be imported from a shared config
export const locales = ["en"] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async () => {
  // Provide a static locale, locale is not part of the routing
  const locale = "en";

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
