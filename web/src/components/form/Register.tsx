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
import { registerAction } from '@/utils/action/registerAction'
import { useToast } from '../ui/use-toast'

import { registerFormSchema, RegisterFormType } from '@/schemas/register-schema'
import placeholder from '@/public/placehorder.jpg'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Button } from '../ui/button'
import { LoaderCircle } from 'lucide-react'

export default function RegisterForm() {
  const { toast } = useToast()
  const router = useRouter()
  const submitRef = useRef<ElementRef<'button'> | null>(null)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)
  const form = useForm<RegisterFormType>({
    resolver: zodResolver(registerFormSchema),
    mode: 'onChange',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    form.setValue('avatar', file)
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="avatar"
          render={({ field: { value, ...fieldValues }, formState }) => (
            <FormItem>
              <FormLabel className="mx-auto flex w-fit cursor-pointer flex-col items-center justify-center gap-2">
                <Image
                  src={form.getValues('avatar') ? window.URL.createObjectURL(form.getValues('avatar')!) : placeholder}
                  alt="Profile image"
                  width={160}
                  height={160}
                  className="aspect-square rounded-full object-cover brightness-75 hover:brightness-95"
                />
                <span className="block text-muted-foreground">Choose profile</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...fieldValues}
                  accept="image/*"
                  type="file"
                  className="hidden"
                  disabled={formState.isSubmitting}
                  onChange={handleChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field, formState }) => (
            <FormItem>
              <FormLabel>
                Username<span className="text-destructive">&nbsp;*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="Lastname"
                  className="bg-background/70"
                  disabled={formState.isSubmitting}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field, formState }) => (
            <FormItem>
              <FormLabel>
                Email<span className="text-destructive">&nbsp;*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="Email"
                  className="bg-background/70"
                  disabled={formState.isSubmitting}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
          <FormField
            control={form.control}
            name="firstname"
            render={({ field, formState }) => (
              <FormItem className="w-full">
                <FormLabel className="block sm:hidden">
                  Firstname<span className="text-destructive">&nbsp;*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Firstname"
                    className="bg-background/70"
                    disabled={formState.isSubmitting}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastname"
            render={({ field, formState }) => (
              <FormItem className="w-full">
                <FormLabel className="block sm:hidden">Lastname</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Lastname"
                    className="bg-background/70"
                    disabled={formState.isSubmitting}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center justify-center gap-6">
          <FormField
            control={form.control}
            name="gender"
            render={({ field, formState }) => (
              <FormItem className="w-full">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger
                    className="bg-background/70 text-muted-foreground"
                    disabled={formState.isSubmitting}
                  >
                    <FormControl>
                      <SelectValue placeholder="Choose your gander" />
                    </FormControl>
                  </SelectTrigger>
                  <SelectContent >
                    <SelectItem value="MALE">Male</SelectItem>
                    <SelectItem value="FEMALE">Female</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="referrance"
            render={({ field, formState }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="Referral Code"
                    className="bg-background/70"
                    disabled={formState.isSubmitting}
                    onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="password"
          render={({ field, formState }) => (
            <FormItem className="w-full">
              <FormLabel>
                Password<span className="text-destructive">&nbsp;*</span>
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    type={!isPasswordVisible ? 'password' : 'text'}
                    placeholder="Password"
                    className="bg-background/70 focus:text-foreground"
                    disabled={formState.isSubmitting}
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
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field, formState }) => (
            <FormItem className="w-full">
              <FormLabel>
                Confirm Password<span className="text-destructive">&nbsp;*</span>
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    type={!isConfirmPasswordVisible ? 'password' : 'text'}
                    placeholder="Confirm Password"
                    className="bg-background/70 focus:text-foreground"
                    disabled={formState.isSubmitting}
                  />
                  {!isConfirmPasswordVisible ? (
                    <EyeClosedIcon
                      onClick={() => setIsConfirmPasswordVisible(!isPasswordVisible)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer opacity-70 hover:opacity-100"
                    />
                  ) : (
                    <EyeOpenIcon
                      onClick={() => setIsConfirmPasswordVisible(!isPasswordVisible)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer opacity-70 hover:opacity-100"
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <button
          type="submit"
          ref={submitRef}
          className="hidden"
        >
          Submit
        </button>
        <Dialog>
          <DialogTrigger
            asChild
            className="w-full"
          >
            <Button
              className="flex w-full items-center justify-center"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <LoaderCircle className="block size-4 motion-safe:animate-spin" />
                  <span className="block">Loading</span>
                </span>
              ) : (
                <span>Create an account</span>
              )}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Double-Check Your Information Before Registering!</DialogTitle>
              <DialogDescription>
                Ensuring the accuracy and completeness of your personal information is crucial during the registration
                process.
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-2 sm:flex-row">
              <DialogClose asChild>
                <Button
                  className="w-full"
                  onClick={() => submitRef.current?.click()}
                >
                  Yes
                </Button>
              </DialogClose>
              <DialogClose
                className="w-full"
                asChild
              >
                <Button>No</Button>
              </DialogClose>
            </div>
            <DialogDescription className="text-center sm:text-start">
              By registering, you agree to our Terms and Conditions.
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </form>
    </Form>
  )
}
