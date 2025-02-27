import { createFileRoute, Outlet } from '@tanstack/react-router'
import { useConfig } from '@/hooks/useConfig'

export const Route = createFileRoute('/_layout')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: config } = useConfig("mrvegas")
  return (
    <div className="flex flex-col">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{config.brand}</h1>
        <nav>

        </nav>
      </header>
      <Outlet />
    </div>
  )
}
