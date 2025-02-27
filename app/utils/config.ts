import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/start";
import { getSiteConfig, type Brand } from "@/data-access/config";

export const fetchConfig = createServerFn({ method: "GET" })
    .validator((d: Brand) => d)
    .handler(async ({ data }) => {
        const config = await getSiteConfig(data)

        return config
    })

export const configQueryOptions = (brand: Brand) => queryOptions({
    queryKey: ["config", brand],
    queryFn: () => fetchConfig({ data: brand }),
})