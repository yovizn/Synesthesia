import { Ticket } from 'lucide-react'
type EventType = {
  id: string
  posterId: string
  promotorId: string
  slug: string
  title: string
  startAt: Date
  endAt: Date
  city: string
  location: string
  description: string
  category: string
  venueType: string
  useVoucher: boolean
  createdAt: string
  updatedAt: string
  poster: { name: string } | null
  Tickets: { price: number; type: string; id: string; capacity: number }[] | null
}

export type { EventType }
