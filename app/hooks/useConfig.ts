import { useSuspenseQuery } from "@tanstack/react-query"
import { configQueryOptions } from "@/utils/config"
import type { Brand } from "@/data-access/config"

export function useConfig(brand: Brand) {
    return useSuspenseQuery(configQueryOptions(brand))
}
