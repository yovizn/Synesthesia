'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { AxiosError } from 'axios'
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons'

import { LoginFormType, loginFormSchema } from '@/schemas/login-schema'
import { loginAction } from '@/utils/loginAction'
import { cn } from '@/lib/utils'

import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { useToast } from '../ui/use-toast'
import useAuthProvider from '@/stores/auth-provider'
import { loginToken } from '@/utils/loginToken'
import { deleteCookie, setCookie } from 'cookies-next'
import ButtonSubmit from '../ui/button-submit'

export default function LoginForm() {
  const { toast } = useToast()
  const setUser = useAuthProvider((state) => state.setUser)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
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
      className="w-full space-y-6"
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
          disabled={isSubmitting}
        />
      </div>
      <div className="space-y-2.5">
        <Label htmlFor="username_email">
          <span className={cn('block w-fit', errors.password ? 'text-destructive' : 'text-foreground')}>
            {!errors.password ? 'Password' : errors.password.message}
          </span>
        </Label>

        <div className="relative">
          <Input
            {...register('password')}
            id="password"
            name="password"
            type={!isPasswordVisible ? 'password' : 'text'}
            disabled={isSubmitting}
          />
          {!isPasswordVisible ? (
            <EyeClosedIcon
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer opacity-70 hover:opacity-100"
            />
          ) : (
            <EyeOpenIcon
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer opacity-70 hover:opacity-100"
            />
          )}
        </div>
      </div>

      <ButtonSubmit
        isSubmitting={isSubmitting}
        label="Login"
        className="w-full"
      />
    </form>
  )
}
