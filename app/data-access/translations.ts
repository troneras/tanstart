import { graphql, readFragment, type FragmentOf } from "@/lib/graphql"
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
export type GlobalTranslationsFragment = FragmentOf<typeof translationsTypesFragment>

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
    // This ensures the type system knows we have a valid fragment
    const translations = data.translationsSingleton?.translations as GlobalTranslationsFragment
    if (!translations) throw new Error("Invalid translations")

    return readFragment(translationsTypesFragment, translations)
}



