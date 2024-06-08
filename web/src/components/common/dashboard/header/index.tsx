'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { PromotorType } from '@/types/promotor.type'
import { renderImage } from '@/utils/action/render'
import { getPromotor } from '@/utils/session/get-promotor'
import { useAuthProvider } from '../../AuthProvider'
import { Separator } from '@/components/ui/separator'
import { PersonIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { CalendarPlus } from 'lucide-react'

export default function DashboardHeader() {
  const data = useAuthProvider((state) => state.user.Promotor)

  const balance = data?.balance
    ? Number(data?.balance).toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR',
      })
    : 'Rp 0,00'

  return (
    <Card className="flex h-20 justify-between px-6">
      <div className="flex items-center space-x-4">
        <div className="text-xl font-bold md:text-3xl">Dashboard</div>
        <Separator orientation="vertical" />
        <div className="text-card-foreground max-lg:hidden">{data?.promotorName}</div>
      </div>

      <div className="flex items-center space-x-4">
        <Link
          href="/promotor/create-event"
          className="hidden items-center gap-4 pl-4 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground md:flex lg:text-base"
        >
          <span className="block">Create Event</span>
          <CalendarPlus className="size-4 shrink-0" />
        </Link>
        <Separator
          orientation="vertical"
          className="max-md:hidden"
        />
        <div className="font-extralight text-card-foreground">{balance}</div>
        <Avatar title="Profile">
          <AvatarImage src={renderImage.webp(data?.promotorImage?.name!)} />
          <AvatarFallback>
            <PersonIcon />
          </AvatarFallback>
        </Avatar>
      </div>
    </Card>
  )
}
