import { graphql } from "@/lib/graphql";

const FooterQuery = graphql(`
query getFooter($brand: Brands!, $license: [Licenses!]!, $locale: [Locale!]!) {
  footer(where: {brand: $brand}, locales: $locale) {
    brand
    copyrightText
    licenseContent(where: {license_in: $license}) {
      license
      content
    }
  }
}`)


















