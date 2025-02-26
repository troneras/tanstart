import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type React from "react"

export function AuthForm({
  actionText,
  onSubmit,
  status,
  afterSubmit
}: {
  actionText: string,
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
  status: 'pending' | 'idle' | 'success' | 'error',
  afterSubmit?: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>{actionText}</CardTitle>
          <CardDescription>
            Enter your email below to {actionText === 'Login' ? 'login to' : 'register'} your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => {
            e.preventDefault()
            onSubmit(e)
          }}>
            <div className="flex flex-col gap-6 pb-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" name="password" required />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  {status === 'pending' ? '...' : actionText}
                </Button>
                <Button variant="outline" className="w-full">
                  {status === 'pending' ? '...' : actionText} with Google
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
