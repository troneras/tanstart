import { graphql, type FragmentOf } from "@/lib/graphql"
import fetchGraphQL from "@/lib/hygraphClient"
import { readFragment } from "gql.tada"


export type Brand = "mrvegas" | "videoslots" | "dbet" | "kungaslottet" | "mr"

const licenseConfigFragment = graphql(`
    fragment LicenseConfig on LicenseConfig {
        license
        name
        defaultLanguage
        supportedLanguages
        countries
}`)


const BrandConfigQuery = graphql(`
query getBrandConfig($brand: Brands!) {
    brandConfig(where: {brand: $brand}) {
    brand
    logo {
      url
    }
    defaultLicense
    availableLicenses {
      ...LicenseConfig
    }
  }
}`, [licenseConfigFragment])




export const getSiteConfig = async (brand: Brand) => {

    const data = await fetchGraphQL(BrandConfigQuery, {
        brand
    })

    if (!data.brandConfig) throw new Error("No config found")

    const config = {
        ...data.brandConfig,
        availableLicenses: data.brandConfig.availableLicenses.map(license => readFragment(licenseConfigFragment, license))
    }

    return config
}



