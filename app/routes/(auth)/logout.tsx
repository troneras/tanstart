import { invalidateSession } from '@/utils/auth'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/start'

const logoutFn = createServerFn().handler(async () => {
  await invalidateSession();

  throw redirect({
    href: '/'
  })
})

export const Route = createFileRoute('/(auth)/logout')({
  preload: false,
  loader: () => logoutFn(),
})