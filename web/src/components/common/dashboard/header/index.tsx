'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { PromotorType } from '@/types/promotor.type'
import { renderImage } from '@/utils/action/render'
import { getPromotor } from '@/utils/session/get-promotor'
import { Separator } from '@radix-ui/react-separator'
import { useAuthProvider } from '../../AuthProvider'

export default function DashboardHeader() {
  const data = useAuthProvider((state) => state.user.Promotor)

  const balance = data?.balance
    ? Number(data?.balance).toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR',
      })
    : 0

  return (
    <Card className="flex h-20 w-full items-center justify-between px-8">
      <div className="flex items-center gap-6">
        <h3 className="text-2xl font-bold">Dashboard</h3>
        <p className="hidden sm:block">{data?.promotorName}</p>
      </div>

      <div className="flex items-center gap-6">
        <p>{balance}</p>
        <Avatar>
          <AvatarImage src={renderImage.webp(data?.promotorImage?.name!)} />
          <AvatarFallback>{data?.promotorName.split('')[0]}</AvatarFallback>
        </Avatar>
      </div>
    </Card>
  )
}
