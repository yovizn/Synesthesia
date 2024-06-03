import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LoginFormType } from '@/schemas/login-schema'
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import { UseFormReturn } from 'react-hook-form'

type PasswordProps = {
  form: UseFormReturn<LoginFormType>
}

export default function LoginPassword({ form }: PasswordProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  return (
    <FormField
      control={form.control}
      name="password"
      disabled={form.formState.isSubmitting}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className="relative">
              <Input
                type={!isPasswordVisible ? 'password' : 'text'}
                placeholder="Password"
                {...field}
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
  )
}
