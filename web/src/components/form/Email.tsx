'use client'

import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { EmailFormType, emailFormSchema } from '@/schemas/email-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import { emailAction } from '@/utils/emailAction'
import { AxiosError } from 'axios'
import { toast } from '../ui/use-toast'
import { useRouter } from 'next/navigation'
import { deleteCookie, setCookie } from 'cookies-next'

export default function EmailForm() {
  const router = useRouter()
  const {
    handleSubmit,
    register,
    reset,
    resetField,
    formState: { isSubmitting, errors },
  } = useForm<EmailFormType>({
    resolver: zodResolver(emailFormSchema),
  })

  const onSubmit = async (payload: EmailFormType) => {
    try {
      const res = await emailAction(payload)
      setCookie('forget_password_token', res.data.forget_password_token)

      toast({
        title: res.data.title,
        description: res.data.description,
        duration: 10000,
      })

      if (res.data.title) {
        reset()
        router.push('/auth/login')
      }
    } catch (error) {
      resetField('email')
      deleteCookie('forget_password_token')
      console.log(error)
      if (error instanceof AxiosError) {
        toast({
          title: error.response?.data.message,
          description: error.response?.data.cause,
          duration: 3000,
          variant: 'destructive',
        })
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <span className="block text-destructive">{errors.email?.message}</span>
      <Input
        {...register('email')}
        name="email"
        type="text"
        placeholder="Email"
      />

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full md:w-auto"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <LoaderCircle className="block size-4 motion-safe:animate-spin" />
            <span className="block">Loading</span>
          </span>
        ) : (
          <span>Enter your email</span>
        )}
      </Button>
    </form>
  )
}
