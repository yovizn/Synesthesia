import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LoginFormType } from '@/schemas/login-schema'
import { UseFormReturn } from 'react-hook-form'

type UsernameEmailProps = {
  form: UseFormReturn<LoginFormType>
}

export default function LoginUsernameEmail({ form }: UsernameEmailProps) {
  return (
    <FormField
      control={form.control}
      name="username_email"
      disabled={form.formState.isSubmitting}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              placeholder="Username or Email"
              autoComplete="username webauthn"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
