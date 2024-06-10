// "slug": "tokopedia.com",
// "title": "krabby patty 8",
// "priceReguler": 50000,
// "priceVip": 10000,
// "capacityReguler": 0,
// "capacityVip": 1000,
// "startAt": "2025-04-01T18:00:00.000Z",
// "endAt": "2025-04-04T18:00:00.000Z",
// "location": "Indonesia",
// "description": "",
// "city": "Depok",
// "venueType": "INDOOR",
// "category": ""

import { z } from 'zod'

const VENUE_TYPE = ['INDOOR', 'OUTDOOR']
const CATEGORY_TYPE = ['ROCK', 'POP', 'METAL', 'JAZZ', 'REGGAE', 'EDM']

const requiredStr = z.string().trim().min(1, { message: 'Required input.' })
const numericRequiredStr = requiredStr.regex(/^\Rp\d+(\.\d{2})?$/, 'Must be valid currency format (RpXXX.XX)')

const avatar = z
  .custom<File | undefined>()
  .refine((file) => !file || (file instanceof File && file.type.startsWith('image/')), 'Must be an image File')
  .refine((file) => !file || file.size < 1024 * 1024 * 2, 'Image Must be less than 2MB').optional()

const description = requiredStr.max(5000).optional()
const venueType = requiredStr.refine((value) => VENUE_TYPE.includes(value), 'Invalid Venue Type')
const category = requiredStr.refine((value) => CATEGORY_TYPE.includes(value), 'Invalid Categories')

const createEventSchema = z
  .object({
    avatar,
    title: requiredStr.max(100, { message: "It's too long for title" }),
    location: requiredStr.max(100).optional(),
    city: requiredStr.max(50).optional(),
    startAt: z.date(),
    endAt: z.date(),
    venueType,
    category,
    description,
    use_voucher: z.boolean().default(false).optional(),
    priceReguler: z.number().optional(),
    capacityReguler: z.number().optional(),
    priceVip: z.number().optional(),
    capacityVip: z.number().optional(),
  })
  .superRefine((val, ctx) => {
    if (val.capacityVip && !val.priceVip) {
      ctx.addIssue({
        code: 'custom',
        message: 'VIP cannot be free, use regular instead',
        path: ['priceVip'],
        fatal: true,
      })
    }

    return val
  })

type CreateEventType = z.infer<typeof createEventSchema>

export { createEventSchema, CATEGORY_TYPE, type CreateEventType }
