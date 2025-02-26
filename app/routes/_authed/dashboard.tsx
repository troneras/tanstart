import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className='flex flex-col container gap-6'>
    <div >Welcome</div>
    <Link to="/logout"> Logout</Link>

  </div>
}
