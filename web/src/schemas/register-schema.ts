import { z } from 'zod'

const password = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters long' })
  .regex(/[A-Z]/, { message: 'Must contain at least 1 uppercase letter' })
  .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/, { message: 'Must contain at least 1 special character' })
  .regex(/[0-9]/, { message: 'Must contain at least 1 number' })

const avatar = z
  .instanceof(File || undefined)
  .refine((file) => file?.size < 1024 * 1024 * 2)
  .refine((file) => file.type.startsWith('image/'))
  .optional()

const registerFormSchema = z
  .object({
    avatar,
    username: z.string().min(6, {
      message: 'Username requires at least 6 characters',
    }),
    email: z.string().email({ message: 'Invalid email address' }),
    referrance: z.string().toUpperCase().optional(),
    firstname: z.string().min(4, { message: 'Firstname requires at least 4 characters' }),
    lastname: z.string().optional(),
    password,
    confirmPassword: z.string(),
    gender: z.union([z.literal('MALE'), z.literal('FEMALE')]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Confirm password must be match to password',
    path: ['confirmPassword'],
  })

type RegisterFormType = z.infer<typeof registerFormSchema>

export { registerFormSchema, type RegisterFormType }
