'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { setCookie } from 'cookies-next'

import Image from 'next/image'

import ButtonSubmit from '@/components/ui/button-submit'
import placeholder from '@/public/placehorder.jpg'
import { useAuthProvider } from '@/components/common/AuthProvider'
import { useRouter } from 'next/navigation'

import { EditUserFormType, editUserFormSchema } from '@/schemas/edit-user-schema'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form'
import { toast } from '@/components/ui/use-toast'
import { Input } from '@/components/ui/input'
import { editUserAciton } from '@/utils/action/editUserAction'
import { renderImage } from '@/utils/action/render'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Copy, CopyCheck } from 'lucide-react'
import { useState } from 'react'

export default function EditUserForm({ params }: { params: { username: string } }) {
  const { user } = useAuthProvider((state) => state)
  const [copiedId, setCopiedId] = useState<string>()
  const router = useRouter()
  const source = user.image?.name ? renderImage.webp(user.image?.name!) : placeholder
  const form = useForm<EditUserFormType>({
    resolver: zodResolver(editUserFormSchema),
  })

  const handleCopied = async () => {
    await navigator.clipboard.writeText(user.referral)
    setCopiedId('write-text')
  }

  const onSubmit = async (payload: EditUserFormType) => {
    try {
      const submit = await editUserAciton(payload, params.username)
      setCookie('access_token', submit.data.access_token)

      toast({
        title: submit.data.title,
        description: submit.data.description,
      })

      router.push('/')
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError) {
        toast({
          variant: 'destructive',
          title: error.response?.data.message,
          description: error.response?.data.cause,
        })
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <div className="flex flex-row md:flex-col items-center justify-between w-full">
          <FormField
            control={form.control}
            name="avatar"
            render={({ field: { value, ...fieldValues } }) => {
              return (
                <FormItem>
                  <FormLabel>
                    <Image
                      src={form.getValues('avatar') ? window.URL.createObjectURL(form.getValues('avatar')!) : source}
                      alt="Profile Image"
                      width={160}
                      height={160}
                      className="aspect-square rounded-full object-cover"
                    />
                    <span></span>
                  </FormLabel>

                  <FormControl>
                    <Input
                      {...fieldValues}
                      accept="image/*"
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        fieldValues.onChange(file)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />

          <div className="flex w-fit md:w-full flex-col items-start justify-between gap-6 md:flex-row">
            <div className="">
              <p>{user.firstname + ' ' + (user.lastname ? user.lastname : '')}</p>
              <p className='text-muted-foreground'>{user.username}</p>
              <p className='text-muted-foreground'>{user.email}</p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="block self-start md:self-end text-muted-foreground">Referral No.</span>
              <Button
                type="button"
                onClick={handleCopied}
                className="flex gap-2"
              >
                {user.referral} {!copiedId ? <Copy className="size-4" /> : <CopyCheck className="size-4" />}
              </Button>
            </div>
          </div>
        </div>

        <Separator />

        <div className="grid gap-x-4 gap-y-2 lg:grid-cols-2">
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Firstname</FormLabel>
                <FormControl>
                  <Input
                    defaultValue={user.firstname && user.firstname}
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
                    defaultValue={user.lastname && user.lastname}
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
                    defaultValue={user.username && user.username}
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
                    defaultValue={user.email && user.email}
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
                    defaultValue={user.address && user.address}
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
                    defaultValue={user.phoneNumber && user.phoneNumber}
                    placeholder={user.phoneNumber || 'Phone Number'}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <ButtonSubmit
          isSubmitting={form.formState.isSubmitting}
          label="Submit your changes"
          className="w-full"
        />
      </form>
    </Form>
  )
}
