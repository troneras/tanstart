import { graphql, type FragmentOf } from "@/lib/graphql"
import fetchGraphQL from "@/lib/hygraphClient"

// TODO this should be inferred from the hygraph config
const supportedLocales = ["en", "es", "sv", "en_CA", "sv_FI"] as const
type Locale = (typeof supportedLocales)[number]

export const translationsTypesFragment = graphql(`
fragment Translations on GlobalTranslations {
    showMore
    search
    playNow
    ok
    cancel
    deposit
    searchGames
    withdraw
}
`)


export const getGlobalTranslationsQuery = graphql(`
query getGlobalTranslations($locales: [Locale!]!) {
  translationsSingleton: singleton(where: {key: "translations"}, locales: $locales) {
    translations: model {
      ... on GlobalTranslations {
        ...Translations
      }
    }
  }
}
`, [translationsTypesFragment])

export const getGlobalTranslations = async (locales: Locale[]) => {
    const data = await fetchGraphQL(getGlobalTranslationsQuery, {
        locales
    })
    const translations = data.translationsSingleton?.translations
    if (!translations) throw new Error("Invalid translations")

    // This ensures the type system knows we have a valid fragment
    return translations as GlobalTranslations
}



export type GlobalTranslations = FragmentOf<typeof translationsTypesFragment>