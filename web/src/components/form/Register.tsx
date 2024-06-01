'use client'

import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons'

import { registerFormSchema, RegisterFormType } from '@/schemas/register-schema'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { registerAction } from '@/utils/registerAction'

import { cn } from '@/lib/utils'
import { useToast } from '../ui/use-toast'
import { useRouter } from 'next/navigation'
import ButtonSubmit from '../ui/button-submit'

export default function RegisterForm() {
  const { toast } = useToast()
  const router = useRouter()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormType>({
    resolver: zodResolver(registerFormSchema),
    mode: 'onChange',
  })

  const onSubmit = async (payload: RegisterFormType) => {
    try {
      const submit = await registerAction(payload)
      toast({
        title: submit.data.title,
        description: submit.data.description,
        duration: 5000,
      })
      router.push('/auth/login')
    } catch (error) {
      if (error instanceof AxiosError) {
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
      className="flex flex-col gap-2"
    >
      {/* Firstname */}
      <div className="space-y-2.5">
        <Label
          className={cn('block w-full text-end', errors.firstname ? 'text-destructive' : 'text-foreground opacity-0')}
          htmlFor="firstname"
        >
          {errors.firstname ? errors.firstname.message : 'Firstname'}
        </Label>
        <Input
          {...register('firstname')}
          id="firstname"
          name="firstname"
          type="text"
          placeholder="Firstname"
        />
      </div>

      {/* Lastname */}
      <div className="space-y-2.5">
        <Label
          className={cn('block w-full text-end', errors.lastname ? 'text-destructive' : 'text-foreground opacity-0')}
          htmlFor="lastname"
        >
          {errors.lastname ? errors.lastname.message : 'Lastname'}
        </Label>
        <Input
          {...register('lastname')}
          id="lastname"
          name="lastname"
          type="text"
          placeholder="Lastname"
        />
      </div>

      {/* Username */}
      <div className="space-y-2.5">
        <Label
          className={cn('block w-full text-end', errors.username ? 'text-destructive' : 'text-foreground opacity-0')}
          htmlFor="username"
        >
          {errors.username ? errors.username.message : 'Username'}
        </Label>
        <Input
          {...register('username')}
          id="username"
          name="username"
          type="text"
          placeholder="Username"
        />
      </div>

      {/* Email */}
      <div className="space-y-2.5">
        <Label
          className={cn('block w-full text-end', errors.email ? 'text-destructive' : 'text-foreground opacity-0')}
          htmlFor="email"
        >
          {errors.email ? errors.email.message : 'Email'}
        </Label>
        <Input
          {...register('email')}
          id="email"
          name="email"
          type="text"
          placeholder="Email"
        />
      </div>

      {/* Gender & Referral Code */}
      <Label
        className={cn('block w-full text-end', errors.gender ? 'text-destructive' : 'text-foreground opacity-0')}
        htmlFor="gender"
      >
        {errors.gender ? 'Gender is requires, at least choose one' : 'Gender'}
      </Label>
      <div className="flex items-end gap-4">
        <Select onValueChange={(value: RegisterFormType['gender']) => setValue('gender', value)}>
          <SelectTrigger
            id="gender"
            className="w-1/2"
          >
            <SelectValue placeholder="Choose your Gender" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="MALE">Male</SelectItem>
            <SelectItem value="FEMALE">Female</SelectItem>
          </SelectContent>
        </Select>

        <div className="w-1/2 space-y-2.5">
          <Input
            {...register('referrance')}
            id="referrance"
            name="referrance"
            type="text"
            placeholder="Referal Code"
            onChange={(val) => setValue('referrance', val.target.value.toUpperCase())}
          />
        </div>
      </div>

      {/* Password */}
      <div className="space-y-2.5">
        <Label
          className={cn('block w-full text-end', errors.password ? 'text-destructive' : 'text-foreground opacity-0')}
          htmlFor="password"
        >
          {errors.password ? errors.password.message : 'Password'}
        </Label>
        <div className="relative w-full">
          <Input
            {...register('password')}
            id="password"
            name="password"
            type={!isPasswordVisible ? 'password' : 'text'}
            placeholder="Password"
            className="block"
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

      {/* Confirm Password */}
      <div className="space-y-2.5">
        <Label
          className={cn(
            'block w-full text-end',
            errors.confirmPassword ? 'text-destructive' : 'text-foreground opacity-0',
          )}
          htmlFor="confirmPassword"
        >
          {errors.confirmPassword ? errors.confirmPassword.message : 'Password'}
        </Label>
        <div className="relative w-full">
          <Input
            {...register('confirmPassword')}
            id="confirmPassword"
            name="confirmPassword"
            type={!isConfirmPasswordVisible ? 'password' : 'text'}
            placeholder="Confirm Password"
            className="block"
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

      <div className="mt-4">
        <ButtonSubmit
          isSubmitting={isSubmitting}
          label="Create an account"
        />
      </div>
    </form>
  )
}
