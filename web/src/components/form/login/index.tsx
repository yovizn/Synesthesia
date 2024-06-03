'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { AxiosError } from 'axios'

import { LoginFormType, loginFormSchema } from '@/schemas/login-schema'
import { loginAction } from '@/utils/loginAction'

import useAuthProvider from '@/stores/auth-provider'
import { loginToken } from '@/utils/loginToken'
import { deleteCookie, setCookie } from 'cookies-next'
import { useToast } from '@/components/ui/use-toast'
import ButtonSubmit from '@/components/ui/button-submit'
import { Form } from '@/components/ui/form'

import LoginUsernameEmail from './username-email'
import LoginPassword from './password'

export default function LoginForm() {
  const { toast } = useToast()
  const setUser = useAuthProvider((state) => state.setUser)
  const router = useRouter()
  const form = useForm<LoginFormType>({
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
