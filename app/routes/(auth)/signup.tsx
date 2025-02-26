import { AuthForm } from '@/components/auth-form'
import { useMutation } from '@/hooks/useMutation'
import { getUserByEmail } from '@/data-access/user'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { createServerFn, useServerFn } from '@tanstack/start'
import { z } from 'zod'
import { createAppSession, verifyPassword } from '@/utils/auth'
import { createPasswordUserUseCase } from '@/use-cases/users'


const AuthData = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(8),
  redirectUrl: z.string().optional()
})


const signupFn = createServerFn({
  method: 'POST',
})
  .validator((auth: unknown) => {
    return AuthData.parse(auth)
  })
  .handler(async (ctx) => {

    let found = await getUserByEmail(ctx.data.email)

    if (found) {
      const isMatch = await verifyPassword(ctx.data.password, found.password!);

      if (!isMatch) {
        // TODO: this is a door for enumeration attack, implement OTP  
        throw new Error("Existing user: Wrong password")
      }
    } else {
      // create user
      found = await createPasswordUserUseCase(ctx.data)
    }

    // add the email and user prefs to session
    // we explicitly don't add the user id as we will add it to the context later from database
    const session = await createAppSession(found.id)
    
    session.update({
      userEmail: found.email
    })


    throw redirect({
      href: ctx.data.redirectUrl || '/dashboard'
    })

  })



export const Route = createFileRoute('/(auth)/signup')({
  component: SignupComp,
  beforeLoad(ctx) {
    // check if user is logged in and redirect to dashboard if he is
  },
})

function SignupComp() {
  const signupMutation = useMutation({
    fn: useServerFn(signupFn)
  })
  return <div className="flex flex-col min-h-svh w-full items-center justify-center p-6 md:p-10">
    <div className="w-full max-w-sm relative">
      <AuthForm
        onSubmit={(e) => {
          const formData = new FormData(e.target as HTMLFormElement)
          signupMutation.mutate({
            data: {
              email: formData.get('email') as string,
              password: formData.get('password') as string
            }
          })
        }}
        actionText='Registration'
        status={signupMutation.status}
      />
      {signupMutation.error && (
        <div className="absolute top-full left-0 right-0 mt-4 text-sm text-red-500">
          {(() => {
            try {
              const errors = JSON.parse(signupMutation.error.message);
              return errors.map((error: any, index: number) => (
                <div key={index} className="flex items-center gap-2">
                  <span>•</span>
                  <span>{error.message}</span>
                </div>
              ));
            } catch {
              return signupMutation.error.message;
            }
          })()}
        </div>
      )}
    </div>
  </div>
}
