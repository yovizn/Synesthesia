import { z } from 'zod'

const emailSchema = z.object({
  email: z.string().email(),
})

type EmailSchemaType = z.infer<typeof emailSchema>

export { emailSchema, type EmailSchemaType }
