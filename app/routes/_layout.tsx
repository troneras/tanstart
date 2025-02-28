import { createFileRoute, Outlet } from '@tanstack/react-router'
import { SiteHeader } from '@/components/site-header'
import { SidebarInset, SidebarProvider, useSidebar } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import SiteFooter from '@/components/site-footer'
import { SideNavigation } from '@/components/side-navigation'
import { TooltipProvider } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/_layout')({
  component: RouteComponent,
})

function RouteComponent() {
  const { state } = useSidebar()
  return (
    <TooltipProvider>
      <div className="[--header-height:calc(theme(spacing.14))]">
        <SidebarProvider className="flex flex-col">
          <SiteHeader />
          <div className="flex flex-1">
            <AppSidebar />
            <SideNavigation />
            <SidebarInset>
              <InnerLayout />
            </SidebarInset>
          </div>
        </SidebarProvider>
      </div>
    </TooltipProvider>
  )
}

export function InnerLayout() {
  const { state } = useSidebar()
  return (
    <div className={cn("flex flex-1 flex-col gap-4 pt-4", {
      "md:ml-14": state === "collapsed"
    })}>
      <Outlet />
      <SiteFooter />
    </div>
  )
}