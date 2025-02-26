import hygraphClient from "@/lib/hygraphClient"




export const getSiteConfig = async () => {
    const data = await hygraphClient.request(`
    query GetSiteConfig {
        siteConfig {
            id
        }
    }
`)
    return data
}