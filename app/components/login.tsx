import { useMutation } from "@/hooks/useMutation";
import { AuthForm } from "./auth-form";

export function Login() {
    const loginMutation = useMutation({
            fn: async () => {
                console.log("hola")
            },
            onSuccess: async () => {

            }
        })


    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <AuthForm
                    onSubmit={(e) => {
                        e.preventDefault();
                        loginMutation.mutate({})
                    }}
                    actionText='Login'
                    status={loginMutation.status}
                />
            </div>
        </div>
    )
}