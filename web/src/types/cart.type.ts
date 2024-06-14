export type CartType = {
  quantity: number
  events: {
    id: string
    title: string
    useVoucher: boolean
    venueType: string
    slug: string
    poster: { name: string }
    promotor: { promotorName: string }
    category: string
  }
  tickets: {
    id: string
    price: string
    capacity: number
    type: 'VIP' | 'REGULER'
  }
}
