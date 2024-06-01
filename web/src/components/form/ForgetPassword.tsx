'use client'

import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { ForgetPasswordType, forgetPasswordSchema } from '@/schemas/forget-password-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import ButtonSubmit from '../ui/button-submit'
import { forgetPasswordAction } from '@/utils/forgetPasswordAction'
import { Label } from '../ui/label'
import { toast } from '../ui/use-toast'
import { AxiosError } from 'axios'
import { deleteCookie, getCookie } from 'cookies-next'
import { useState } from 'react'
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons'

export default function ForgetPasswordForm({ params }: { params: string }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)
  const id = getCookie('forget_password_token') || ''
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ForgetPasswordType>({
    resolver: zodResolver(forgetPasswordSchema),
  })

  const onSubmit = async (payload: ForgetPasswordType) => {
    try {
      const submit = await forgetPasswordAction(payload, id, params)
      deleteCookie('forget_password_token')

      toast({
        title: submit.data.title,
        description: submit.data.description,
      })
    } catch (error) {
      if (error instanceof AxiosError) {
        const title =
          error.response?.data.message == 'jwt expired'
            ? 'You need to verify your email again'
            : error.response?.data.message

        toast({
          title,
          description: error.response?.data.cause,
          variant: 'destructive',
          duration: 3000,
        })
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div className="space-y-4">
        <Label
          htmlFor="password"
          className={errors.password ? 'text-destructive' : ''}
        >
          {!errors.password ? 'Enter your new password' : errors.password.message}
        </Label>
        <div className="relative">
          <Input
            {...register('password')}
            id="password"
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

      <div className="space-y-4">
        <Label
          htmlFor="confirmPassword"
          className={errors.confirmPassword ? 'text-destructive' : ''}
        >
          {!errors.confirmPassword ? 'Confirm your new password' : errors.confirmPassword.message}
        </Label>
        <div className="relative">
          <Input
            {...register('confirmPassword')}
            id="confirmPassword"
            type={!isConfirmPasswordVisible ? 'password' : 'text'}
            disabled={isSubmitting}
          />
          {!isConfirmPasswordVisible ? (
            <EyeClosedIcon
              onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer opacity-70 hover:opacity-100"
            />
          ) : (
            <EyeOpenIcon
              onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer opacity-70 hover:opacity-100"
            />
          )}
        </div>
      </div>

      <ButtonSubmit
        isSubmitting={isSubmitting}
        label="Create new password"
      />
    </form>
  )
}
