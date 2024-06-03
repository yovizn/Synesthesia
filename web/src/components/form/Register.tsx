'use client'

import { AxiosError } from 'axios'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { ChangeEvent, ElementRef, useRef, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { registerAction } from '@/utils/registerAction'
import { useToast } from '../ui/use-toast'

import { cn } from '@/lib/utils'
import { registerFormSchema, RegisterFormType } from '@/schemas/register-schema'
import ButtonSubmit from '../ui/button-submit'
import placeholder from '@/public/placehorder.jpg'

export default function RegisterForm() {
  const { toast } = useToast()
  const router = useRouter()
  const inputFileRef = useRef<ElementRef<'input'> | null>(null)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)
  const [hasImage, setHasImage] = useState<File | null>(null)
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormType>({
    resolver: zodResolver(registerFormSchema),
    mode: 'onChange',
  })

  const username = getValues('username')
  const images = getValues('avatar')

  const handleImageClick = () => {
    inputFileRef.current?.click()
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const file = e.target.files![0]
    setValue('avatar', file)
  }

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
      <div
        onClick={handleImageClick}
        className="mx-auto mb-6 flex cursor-pointer flex-col items-center"
      >
        <Image
          src={placeholder}
          alt="Profile Image"
          height={140}
          width={140}
          className="rounded-[50%] object-cover"
        />
        <Input
          {...register('avatar')}
          ref={inputFileRef}
          type="file"
          accept="image/*"
          alt="Profile Image"
          onChange={handleImageChange}
          className="hidden"
          disabled={isSubmitting}
        />
        <span className="text-destructive">{errors.avatar?.message}</span>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        {/* Firstname */}
        <div className="w-full space-y-2.5">
          <Label
            className={cn('block w-full', errors.firstname ? 'text-destructive' : 'text-foreground')}
            htmlFor="firstname"
          >
            {errors.firstname ? errors.firstname.message : 'Firstname'}
          </Label>
          <Input
            {...register('firstname')}
            id="firstname"
            name="firstname"
            type="text"
            className="bg-background/70"
            placeholder="Firstname"
            disabled={isSubmitting}
          />
        </div>

        {/* Lastname */}
        <div className="w-full space-y-2.5">
          <Label
            className={cn('block w-full', errors.lastname ? 'text-destructive' : 'text-foreground')}
            htmlFor="lastname"
          >
            {errors.lastname ? errors.lastname.message : 'Lastname'}
          </Label>
          <Input
            {...register('lastname')}
            id="lastname"
            name="lastname"
            type="text"
            className="bg-background/70"
            placeholder="Lastname"
            disabled={isSubmitting}
          />
        </div>
      </div>

      {/* Username */}
      <div className="space-y-2.5">
        <Label
          className={cn('block w-full', errors.username ? 'text-destructive' : 'text-foreground')}
          htmlFor="username"
        >
          {errors.username ? errors.username.message : 'Username'}
        </Label>
        <Input
          {...register('username')}
          id="username"
          name="username"
          type="text"
          className="bg-background/70"
          placeholder="Username"
          disabled={isSubmitting}
        />
      </div>

      {/* Email */}
      <div className="space-y-2.5">
        <Label
          className={cn('block w-full', errors.email ? 'text-destructive' : 'text-foreground')}
          htmlFor="email"
        >
          {errors.email ? errors.email.message : 'Email'}
        </Label>
        <Input
          {...register('email')}
          id="email"
          name="email"
          type="text"
          className="bg-background/70"
          placeholder="Email"
          disabled={isSubmitting}
        />
      </div>

      {/* Gender & Referral Code */}
      <Label
        className={cn('block w-full', errors.gender ? 'text-destructive' : 'text-foreground')}
        htmlFor="gender"
      >
        {errors.gender ? 'Gender is requires, at least choose one' : 'Gender'}
      </Label>
      <div className="flex items-end gap-4">
        <Select onValueChange={(value: RegisterFormType['gender']) => setValue('gender', value)}>
          <SelectTrigger
            id="gender"
            className="w-1/2 bg-background/70"
          >
            <SelectValue placeholder="Choose your Gender" />
          </SelectTrigger>

          <SelectContent className=" focus:ring-0">
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
            className="bg-background/70"
            onChange={(val) => setValue('referrance', val.target.value.toUpperCase())}
          />
        </div>
      </div>

      {/* Password */}
      <div className="space-y-2.5">
        <Label
          className={cn('block w-full', errors.password ? 'text-destructive' : 'text-foreground')}
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
            className="bg-background/70"
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

      {/* Confirm Password */}
      <div className="space-y-2.5">
        <Label
          className={cn('block w-full', errors.confirmPassword ? 'text-destructive' : 'text-foreground')}
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
            className="bg-background/70"
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
        label="Create an account"
        className="mt-4 w-full bg-background text-foreground hover:bg-background/70"
      />
    </form>
  )
}
