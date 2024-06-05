import { z } from 'zod'

const avatar = z
  .instanceof(File || undefined)
  .refine((file) => file?.size < 1024 * 1024 * 2)
  .refine((file) => file.type.startsWith('image/'))
  .optional()

const username = z.string().min(6, {
  message: 'Username requires at least 6 characters',
}).optional()

const editUserFormSchema = z.object({
  firstname: z.string().min(4, { message: 'Firstname requires at least 4 characters' }).optional(),
  lastname: z.string().optional(),
  username,
  email: z.string().email({ message: 'Invalid email address' }).optional(),
  address: z.string().optional(),
  phoneNumber: z.string().min(12).max(13).optional(),
  avatar,
})

type EditUserFormType = z.infer<typeof editUserFormSchema>

export { editUserFormSchema, type EditUserFormType }
