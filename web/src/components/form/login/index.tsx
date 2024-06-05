'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { AxiosError } from 'axios'

import { LoginFormType, loginFormSchema } from '@/schemas/login-schema'
import { loginAction } from '@/utils/action/loginAction'

import { loginToken } from '@/utils/action/loginToken'
import { deleteCookie, setCookie } from 'cookies-next'
import { useToast } from '@/components/ui/use-toast'
import ButtonSubmit from '@/components/ui/button-submit'
import { Form } from '@/components/ui/form'

import LoginUsernameEmail from './username-email'
import LoginPassword from './password'

export default function LoginForm() {
  const { toast } = useToast()
  const router = useRouter()
  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
  })

  const onSubmit = async (payload: LoginFormType) => {
    try {
      const action = await loginAction(payload)
      setCookie('access_token', action.data.access_token)
      setCookie('refresh_token', action.data.refresh_token)
      deleteCookie('forget_password_token')
      deleteCookie('forget_password_access_token')
      toast({
        title: action?.data.title,
        description: action?.data.description,
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6"
      >
        <LoginUsernameEmail form={form} />

        <LoginPassword form={form} />

        <ButtonSubmit
          isSubmitting={form.formState.isSubmitting}
          label="Login"
          className="w-full"
        />
      </form>
    </Form>
  )
}
