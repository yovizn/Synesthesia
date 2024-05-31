'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import { AxiosError } from 'axios'

import { LoginFormType, loginFormSchema } from '@/schemas/login-schema'
import { loginAction } from '@/utils/loginAction'
import { cn } from '@/lib/utils'

import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { useToast } from '../ui/use-toast'
import useAuthProvider from '@/stores/auth-provider'
import { loginToken } from '@/utils/loginToken'
import { deleteCookie, setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const { toast } = useToast()
  const setUser = useAuthProvider((state) => state.setUser)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
  })

  const onSubmit = async (payload: LoginFormType) => {
    try {
      const submit = await loginAction(payload)
      const u = loginToken()

      setCookie('access_token', submit.data.access_token)
      setCookie('refresh_token', submit.data.refresh_token)
      deleteCookie('forget_password_token')
      deleteCookie('forget_password_access_token')
      setUser(u!)

      toast({
        title: submit?.data.title,
        description: submit?.data.description,
        duration: 5000,
      })

      router.push('/')
      window.location.reload()
    } catch (error) {
      if (error instanceof AxiosError) {
        deleteCookie('access_token')
        deleteCookie('refresh_token')
        deleteCookie('forget_password_token')
        deleteCookie('forget_password_access_token')

        toast({
          title: error.response?.data.message,
          description: error.response?.data.cause,
          variant: 'destructive',
          duration: 5000,
        })
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div className="space-y-2.5">
        <Label htmlFor="username_email">
          <span className={cn('block w-fit', errors.username_email ? 'text-destructive' : 'text-foreground')}>
            {!errors.username_email ? 'Username or Email' : errors.username_email.message}
          </span>
        </Label>
        <Input
          {...register('username_email')}
          id="username_email"
          name="username_email"
          type="text"
        />
      </div>
      <div className="space-y-2.5">
        <Label htmlFor="username_email">
          <span className={cn('block w-fit', errors.password ? 'text-destructive' : 'text-foreground')}>
            {!errors.password ? 'Password' : errors.password.message}
          </span>
        </Label>
        <Input
          {...register('password')}
          id="password"
          name="password"
          type="password"
        />
      </div>

      <Button
        type="submit"
        className="flex w-full items-center justify-center"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <LoaderCircle className="block size-4 motion-safe:animate-spin" />
            <span className="block">Loading</span>
          </span>
        ) : (
          <span>Login</span>
        )}
      </Button>
    </form>
  )
}
