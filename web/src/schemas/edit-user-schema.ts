import { z } from 'zod'

const password = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters long' })
  .regex(/[A-Z]/, { message: 'Must contain at least 1 uppercase letter' })
  .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/, { message: 'Must contain at least 1 special character' })
  .regex(/[0-9]/, { message: 'Must contain at least 1 number' })
  .optional()

const avatar = z
  .instanceof(File || undefined)
  .refine((file) => file?.size < 1024 * 1024 * 2)
  .refine((file) => file.type.startsWith('image/'))
  .optional()

const username = z
  .string()
  .min(6, {
    message: 'Username requires at least 6 characters',
  })
  .optional()

const editUserFormSchema = z
  .object({
    firstname: z.string().min(4, { message: 'Firstname requires at least 4 characters' }).optional(),
    lastname: z.string().optional(),
    username,
    email: z.string().email({ message: 'Invalid email address' }).optional(),
    // password,
    // confirmPassword: z.string().optional(),
    // birth: z.date().optional(),
    address: z.string().optional(),
    phoneNumber: z.string().min(12).max(13).optional(),
    avatar,
  })
  // .refine((data) => data.password === data.confirmPassword, {
  //   message: 'Confirm password must be match to password',
  //   path: ['confirmPassword'],
  // })

type EditUserFormType = z.infer<typeof editUserFormSchema>

export { editUserFormSchema, type EditUserFormType }
