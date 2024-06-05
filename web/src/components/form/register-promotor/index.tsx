'use client'

import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { AxiosError } from 'axios'

import placeholder from '@/public/placehorder.jpg'

import { registerPromotorFormSchema, registerPromotorFormType } from '@/schemas/register-promotor-schema'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import ButtonSubmit from '@/components/ui/button-submit'
import { registerPromotorAction } from '@/utils/action/registerPromotorAction'
import { toast } from '@/components/ui/use-toast'
import { setCookie } from 'cookies-next'

export default function RegisterPromotorForm() {
  const router = useRouter()
  const form = useForm<registerPromotorFormType>({
    resolver: zodResolver(registerPromotorFormSchema),
    mode: 'onChange',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    form.setValue('avatar', file)
  }

  const onSubmit = async (payload: registerPromotorFormType) => {
    try {
      const action = await registerPromotorAction(payload).then((res) => {
        setCookie('access_token', res.data.access_token)
        return res
      })
      toast({
        title: action.data.title,
        description: action.data.description,
      })
      window.location.reload()
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          title: error.message,
          description: error.cause?.message,
        })
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-2/3 space-y-6"
      >
        <FormField
          control={form.control}
          name="avatar"
          render={({ field: { value, ...fieldValues }, formState }) => (
            <FormItem>
              <FormLabel className="group flex flex-col items-center gap-2">
                <Image
                  src={form.getValues('avatar') ? window.URL.createObjectURL(form.getValues('avatar')!) : placeholder}
                  alt="Profile image"
                  width={160}
                  height={160}
                  className="aspect-square rounded-full object-cover brightness-75 transition-all duration-200 group-hover:brightness-95"
                />
                <span className="block text-muted-foreground transition-colors duration-200 group-hover:text-foreground">
                  Choose Logo
                </span>
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
          name="promotorName"
          render={({ field, formState }) => (
            <FormItem>
              <FormLabel>Promotor Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="Promotor Name"
                  className="bg-background/70"
                  disabled={formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="promotorDescription"
          render={({ field, formState }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                {/* <Input
                  {...field}
                  type=""
                  placeholder="Description"
                  className="bg-background/70"
                  disabled={formState.isSubmitting}
                /> */}
                <Textarea
                  {...field}
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                />
              </FormControl>
              <FormDescription>let discribe you to other users and organizations.</FormDescription>
              <FormMessage />
              <FormMessage />
            </FormItem>
          )}
        />
        <ButtonSubmit
          isSubmitting={form.formState.isSubmitting}
          label="Create your organizations"
        />
      </form>
    </Form>
  )
}
