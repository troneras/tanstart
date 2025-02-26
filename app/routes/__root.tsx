// app/routes/__root.tsx
import type { ReactNode } from 'react'
import {
    Outlet,
    createRootRoute,
    HeadContent,
    Scripts,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Toaster } from "@/components/ui/sonner"

import appCss from "@/styles/app.css?url"
import { getCurrentUser } from '@/utils/session'
import { createServerFn } from '@tanstack/start'
import { DefaultCatchBoundary } from '@/components/DefaultCatchBoundary'

const fetchUser = createServerFn({ method: 'GET' }).handler(async () => {
    // We need to auth on the server so we have access to secure cookies
    const user = await getCurrentUser()

    return {
        user
    }
})


export const Route = createRootRoute({
    head: () => ({
        meta: [
            {
                charSet: 'utf-8',
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                title: 'TanStack Start Starter',
            },
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
    component: RootComponent,
    errorComponent: (props) => {
        return (
            <RootDocument>
                <DefaultCatchBoundary {...props} />
            </RootDocument>
        )
    },

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

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <html lang="en">
            <head>
                <HeadContent />
            </head>
            <body className='h-screen overflow-hidden'>
                {children}
                <Toaster />
                <Scripts />
            </body>
        </html>
    )
}