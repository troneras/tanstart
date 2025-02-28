import { createFileRoute, Outlet } from '@tanstack/react-router'
import { SiteHeader } from '@/components/site-header'
export const Route = createFileRoute('/_layout')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex flex-col">
      <SiteHeader />
      <Outlet />
    </div>
  )
}
