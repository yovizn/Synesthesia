'use client'

import { CalendarPlus } from 'lucide-react'
import Link from 'next/link'
import { useAuthProvider } from '../AuthProvider'

export default function PromotorButton() {
  const { user } = useAuthProvider((state) => state)

  if (user.Promotor?.id)
    return (
      <Link
        href="/promotor/create-event"
        className="group flex items-center gap-1.5"
      >
        <CalendarPlus className="size-4 stroke-muted-foreground transition-all duration-200 group-hover:stroke-foreground" />
        <span className="block text-muted-foreground transition-all duration-200 group-hover:text-foreground">
          Create Event
        </span>
      </Link>
    )
  return null
}
