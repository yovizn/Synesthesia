type PromotorType = {
  id: string
  promotorName: string
  promotorDescription: string
  balance: number
  promotorImage: { name: string | null } | null
  Event: []
}

export type { PromotorType }
