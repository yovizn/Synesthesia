import { PromotorType } from './promotor.type'
import { TicketType } from './ticket.type'
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
  promotor: {
    promotorName: string
    promotorImage: { name: string | null } | null
  }
}

type EventDetailType = {
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
  createdAt: Date
  updatedAt: Date
  promotor: PromotorType
  Tickets: TicketType[]
  poster: { name: string } | null
}

export type { EventType, EventDetailType }
