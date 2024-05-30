import { z } from 'zod'

const emailFormSchema = z.object({
  email: z.string({ message: 'Required' }).email({ message: 'Invalid email type' }),
})

type EmailFormType = z.infer<typeof emailFormSchema>

export { emailFormSchema, type EmailFormType }
