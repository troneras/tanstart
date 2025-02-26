// app/routes/__root.tsx
import type { ReactNode } from 'react'
import {
    Outlet,
    createRootRoute,
    HeadContent,
    Scripts,
    createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Toaster } from "@/components/ui/sonner"

import appCss from "@/styles/app.css?url"
import { getCurrentUser } from '@/utils/session'
import { createServerFn } from '@tanstack/start'
import { DefaultCatchBoundary } from '@/components/DefaultCatchBoundary'
import { ThemeProvider } from '@/components/ThemeProvider'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { QueryClient } from '@tanstack/react-query'
import { seo } from '@/utils/seo'
import { NotFound } from '@/components/NotFound'

const fetchUser = createServerFn({ method: 'GET' }).handler(async () => {
    // We need to auth on the server so we have access to secure cookies
    const user = await getCurrentUser()

    return {
        user
    }
})


export const Route = createRootRouteWithContext<{
    queryClient: QueryClient
}>()({
    head: () => ({
        meta: [
            {
                charSet: 'utf-8',
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            ...seo({
                title:
                    'TanStack Start | Type-Safe, Client-First, Full-Stack React Framework',
                description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
            }),
        ],
        links: [
            {
                rel: "stylesheet",
                href: appCss,
            },
            {
                rel: "preconnect",
                href: "https://fonts.googleapis.com",
            },
            {
                rel: "preconnect",
                href: "https://fonts.gstatic.com",
                crossOrigin: "anonymous",
            },
            {
                rel: "preload",
                href: "https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap",
                as: "style",
            },
            {
                rel: "stylesheet",
                href: "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Playfair+Display:wght@400;500;600;700&display=swap&display=swap",
            },
        ],
    }),
    errorComponent: (props) => {
        return (
            <RootDocument>
                <DefaultCatchBoundary {...props} />
            </RootDocument >
        )
    },
    notFoundComponent: () => <NotFound />,
    component: RootComponent,

    beforeLoad: async () => {
        const { user } = await fetchUser()

        return {
            user
        }
    }
})

function RootComponent() {
    return (
        <RootDocument>
            <Outlet />
            <TanStackRouterDevtools />
        </RootDocument>
    )
}


function RootDocument({ children }: { children: React.ReactNode }) {
    return (
        <html suppressHydrationWarning>
            <head>
                <HeadContent />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                let theme = document.cookie.match(/ui-theme=([^;]+)/)?.[1] || 'system';
                let root = document.documentElement;
                
                if (theme === 'system') {
                  theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                }
                
                root.classList.add(theme);
              `,
                    }}
                />
            </head>
            <body className="h-screen">
                <ThemeProvider>
                    <div className="h-[calc(100vh-64px)] mt-16">{children}</div>
                    <TanStackRouterDevtools position="bottom-right" />
                    <ReactQueryDevtools buttonPosition="bottom-left" />
                    <Toaster />
                    <Scripts />
                </ThemeProvider>
            </body>
        </html>
    );
}