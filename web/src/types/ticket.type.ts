type TicketType = {
  id: string
  eventId: string
  price: number | null | undefined
  type: 'REGULER' | 'VIP'
  capacity: number | null | undefined
  createdAt: Date
  updatedAt: Date
} | null

export type { TicketType }
