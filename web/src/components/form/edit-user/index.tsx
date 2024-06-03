'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { AxiosError } from 'axios'

import useAuthProvider from '@/stores/auth-provider'
import ButtonSubmit from '@/components/ui/button-submit'
import placeholder from '@/public/placehorder.jpg'

import { EditUserFormType, editUserFormSchema } from '@/schemas/edit-user-schema'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form'
import { toast } from '@/components/ui/use-toast'
import { Input } from '@/components/ui/input'
import { editUserAciton } from '@/utils/editUserAction'
import { renderImage } from '@/utils/render'
import { useRouter } from 'next/navigation'

export default function EditUserForm({ params }: { params: { username: string } }) {
  const user = useAuthProvider((state) => state.user)
  const router = useRouter()
  const source = renderImage.webp(user.image?.name!) || placeholder
  const form = useForm<EditUserFormType>({
    resolver: zodResolver(editUserFormSchema),
    defaultValues: {
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      email: user.email,
      address: user.address,
      phoneNumber: user.phoneNumber,
    },
    mode: 'onChange',
  })
  useEffect(() => {
    if (user)
      Object.entries(user).forEach(([key, value]) => {
        form.setValue(
          key as 'firstname' | 'lastname' | 'username' | 'email' | 'address' | 'phoneNumber',
          value as 'string | number | Date | undefined',
        )
      })
  }, [user])

  const onSubmit = async (payload: EditUserFormType) => {
    try {
      const submit = await editUserAciton(payload, params.username)
      toast({
        title: submit.data.title,
        description: submit.data.description,
      })
      window.location.reload()
      router.push('/')
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          variant: 'destructive',
          title: error.response?.data.title,
          description: error.response?.data.cause,
        })
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <div className="flex flex-col items-center justify-center">
          <FormField
            control={form.control}
            name="avatar"
            render={({ field: { value, ...fieldValues } }) => {
              return (
                <FormItem>
                  <FormLabel className="mx-auto flex flex-col items-center justify-center">
                    <Image
                      src={form.getValues('avatar') ? window.URL.createObjectURL(form.getValues('avatar')!) : source}
                      alt="Profile Image"
                      width={160}
                      height={160}
                      className="aspect-square rounded-full object-cover"
                    />
                    Change profile
                  </FormLabel>

                  <FormControl>
                    <Input
                      {...fieldValues}
                      accept="image/*"
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        console.log(file)

                        fieldValues.onChange(file)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
        </div>

        <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Firstname</FormLabel>
              <FormControl>
                <Input
                  placeholder={user.firstname || 'Firstname'}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lastname</FormLabel>
              <FormControl>
                <Input
                  placeholder={user.lastname || 'Lastname'}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder={user.username || 'Username'}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder={user.email || 'Email'}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input
                  placeholder={user.address || 'Address'}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone number</FormLabel>
              <FormControl>
                <Input
                  placeholder={user.phoneNumber || 'Phone Number'}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ButtonSubmit
          isSubmitting={form.formState.isSubmitting}
          label="Submit your changes"
          className="w-full"
        />
      </form>
    </Form>
  )
}
