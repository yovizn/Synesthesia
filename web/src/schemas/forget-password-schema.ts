import { z } from 'zod'

const forgetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .regex(/[A-Z]/, { message: 'Must contain at least 1 uppercase letter' })
      .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/, { message: 'Must contain at least 1 special character' })
      .regex(/[0-9]/, { message: 'Must contain at least 1 number' }),
    confirmPassword: z.string(),
  })
  .refine((field) => field.confirmPassword === field.password, {
    message: 'Confirm password must be match to password',
    path: ['confirmPassword'],
  })

type ForgetPasswordType = z.infer<typeof forgetPasswordSchema>

export { type ForgetPasswordType, forgetPasswordSchema }
