import { createFileRoute, Outlet } from '@tanstack/react-router'
import { SiteHeader } from '@/components/site-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import SiteFooter from '@/components/site-footer'
import { SideNavigation } from '@/components/side-navigation'
import { TooltipProvider } from '@/components/ui/tooltip'

export const Route = createFileRoute('/_layout')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <TooltipProvider>
      <div className="[--header-height:calc(theme(spacing.14))]">
        <SidebarProvider className="flex flex-col">
          <SiteHeader />
          <div className="flex flex-1">
            <AppSidebar />
            <SideNavigation />
            <SidebarInset>
              <div className="flex flex-1 flex-col gap-4 p-4 md:ml-14">
                <Outlet />
                <SiteFooter />
              </div>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </div>
    </TooltipProvider>
  )
}
