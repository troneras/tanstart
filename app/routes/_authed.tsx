import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed')({
  beforeLoad: ({ context }) => {
    if (!context.user) {
      redirect({
        href: '/login'
      })
    }
  },

  // USE THIS IF SHOWING A POPOUP PERHAPS? 
  // beforeLoad: ({ context }) => {
  //   if (!context.user) {
  //     console.log("context", context)
  //     throw new Error("Not authenticated")
  //   }
  // },
  // errorComponent: ({ error }) => {
  //   if (error.message === 'Not authenticated') {
  //     throw redirect({
  //       to: "/login",
  //     });
  //   }

  //   throw error
  // }
})

