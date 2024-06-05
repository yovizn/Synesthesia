import { z } from 'zod'

const promotorName = z.string()
const promotorDescription = z.string()
const avatar = z
  .instanceof(File || undefined)
  .refine((file) => file?.size < 1024 * 1024 * 2)
  .refine((file) => file.type.startsWith('image/'))
  .optional()
const registerPromotorFormSchema = z.object({
  promotorName,
  promotorDescription,
  avatar,
})
type registerPromotorFormType = z.infer<typeof registerPromotorFormSchema>
export { registerPromotorFormSchema, type registerPromotorFormType }
