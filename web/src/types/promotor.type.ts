import { EventType } from "./event.type"

type PromotorType = {
  id: string
  promotorName: string
  promotorDescription: string
  balance: number
  promotorImage: { name: string | null } | null
  Event: EventType[]
}

export type { PromotorType }
