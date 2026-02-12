# TanStart

A multi-brand gaming platform frontend built with TanStack Start, React 19, and Bun.

## What is this?

A full-stack web application that powers multiple gaming brands from a single codebase. Each brand gets its own configuration, branding, licenses, and supported languages — all driven by a headless CMS (Hygraph).

## Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Bun |
| Framework | TanStack Start (Vinxi/Vite) |
| UI | React 19 + Radix UI + Tailwind CSS v4 |
| Routing | TanStack Router (file-based) |
| Server State | TanStack Query v5 |
| Database | PostgreSQL + Drizzle ORM |
| CMS | Hygraph (GraphQL) |
| GraphQL | gql.tada (compile-time type safety) |
| Auth | Session cookies + bcrypt (Bun native) |
| Deployment | Docker |

## Architecture

```
React Components (TanStack Router)
        │
  Hooks & Query Layer (TanStack Query)
        │
  Data-Access Layer (Server Functions)
        │
   ┌────┴─────┬──────────┐
   │          │          │
 Hygraph   PostgreSQL  Sessions
 CMS API   (Drizzle)   (Cookies)
```

The data-access layer acts as a black box — each module (config, users, sessions, translations) exposes a clean API and hides its implementation. Server functions (`createServerFn`) bridge client and server seamlessly.

## Key Features

- **Multi-tenant** — One codebase, multiple brands with distinct config, logos, and licenses
- **Type-safe GraphQL** — gql.tada validates queries at compile time against the Hygraph schema
- **Server-first auth** — Bcrypt hashing via Bun, HTTP-only cookies, 15-day token rotation
- **Route protection** — `beforeLoad` guards redirect unauthenticated users
- **i18n** — Translations fetched from CMS per brand and locale
- **SSR** — Server-side rendering with TanStack Start

## Getting Started

### Prerequisites

- [Bun](https://bun.sh)
- Docker & Docker Compose (for PostgreSQL)

### Setup

```bash
# Install dependencies
bun install

# Start PostgreSQL
docker compose up -d

# Push database schema
bun run db:push

# Start dev server
bun run dev
```

### Environment Variables

Create a `.env` file:

```env
DATABASE_URL=postgres://user:password@localhost:5432/tanstart
HYGRAPH_API_URL=<your-hygraph-endpoint>
```

### GraphQL Codegen

Codegen generates types for GraphQL queries and mutations by checking usages of the GraphQL client against the remote Hygraph schema.

```bash
bun dev:codegen
```

## Project Structure

```
app/
├── components/       # UI components (Radix/shadcn patterns)
├── routes/           # File-based routing
│   ├── __root.tsx    # Root layout
│   ├── _layout.tsx   # Main layout with sidebar
│   ├── _authed.tsx   # Protected route guard
│   └── (auth)/       # Login, signup, logout
├── data-access/      # Server-side data modules
├── hooks/            # Custom React hooks
├── lib/              # GraphQL client, utilities
├── use-cases/        # Business logic
├── utils/            # Auth, session, config helpers
└── db/               # Drizzle ORM setup
drizzle/
├── schema.ts         # Database tables (users, sessions)
├── relations.ts      # Table relationships
└── types.ts          # Generated types
```

## Design Decisions

**Why graphql-request instead of Apollo/Relay?** — It's the most minimal GraphQL client. Since TanStack Query already handles caching, a heavy client with its own cache would be redundant.

**Why gql.tada?** — Compile-time type safety for GraphQL without a separate codegen step. Queries are validated against the Hygraph schema via the TypeScript plugin.

**Why wrap queries in gql?** — Tooling support: automatic formatting and syntax highlighting. Recommended: [GraphQL VS Code extension](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql).

## Workflow: Adding a New Query

1. Build the query in the GraphiQL interface
2. Copy it into `app/data-access/` in the appropriate file
3. Create a function that executes the query and returns typed data
4. Create a hook in `app/hooks/` that wraps the function with TanStack Query
5. Create a component that consumes the hook
6. Add a route that renders the component

## Hygraph Setup

To create a new license:
1. Add the license to the `licenses` enum
2. Create a new license config singleton named `{license}-config`

## License

MIT
