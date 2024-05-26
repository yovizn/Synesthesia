import { z } from 'zod'

const registerFormSchema = z
  .object({
    username: z.string().min(6, {
      message: 'Username requires at least 6 characters',
    }),
    email: z.string().email({ message: 'Invalid email address' }),
    referrance: z.string().toUpperCase().optional(),
    firstname: z
      .string()
      .min(4, { message: 'Firstname requires at least 4 characters' }),
    lastname: z.string().optional(),
    password: z.string().min(6, { message: 'Password min 6 character' }),
    confirmPassword: z.string(),
    gender: z.union([z.literal('MALE'), z.literal('FEMALE')]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password must  be match',
    path: ['confirmPassword'],
  })

type RegisterFormType = z.infer<typeof registerFormSchema>

export { registerFormSchema, type RegisterFormType }
