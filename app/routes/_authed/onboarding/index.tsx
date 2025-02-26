import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/start'



export const Route = createFileRoute('/_authed/onboarding/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(auth)/onboarding/"!</div>
}
