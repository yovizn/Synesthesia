'use client'

import { CartType } from '@/types/cart.type'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { renderImage } from '@/utils/action/render'
import { Trash } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { deleteCart } from '@/utils/action/deleteCartAction'
import { formatMoney } from '@/utils/format-any'

export default function Cart({ cart }: { cart: CartType }) {
  const handleDelete = async (ticketId: string, eventId: string) => {
    const data = await deleteCart(ticketId, eventId)
    toast({
      title: data.title,
    })

    window.location.reload()
  }

  return (
    <div>
      <Card className="space-y-4 px-4 pb-6 pt-4">
        <div className="flex w-full items-center justify-between">
          <p className="truncate font-bold">{cart.events.promotor.promotorName}</p>

          <div className="space-x-2">
            {cart.events.venueType === 'INDOOR' ? (
              <Badge variant={'outline'}>Indoor</Badge>
            ) : (
              <Badge className="bg-orange-600">Outdoor</Badge>
            )}
            {cart.events.useVoucher && <Badge>Voucher</Badge>}
          </div>
        </div>

        <div className="flex w-full items-center gap-2">
          <Avatar className="rounded-md md:h-24 md:w-40">
            <AvatarImage
              src={renderImage.png(cart.events.poster.name)}
              className="md:aspect-video"
            />

            <AvatarFallback className="rounded-md">{cart.events.promotor.promotorName.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="flex w-full flex-col self-start truncate text-lg font-semibold md:text-2xl">
            <Link href={`/events/${cart.events.slug}`} className='space-y-0.5'>
              {cart.tickets.capacity <= 10 && (
                <span className="block text-sm font-medium text-orange-600/50">{cart.tickets.capacity} left</span>
              )}
              <span className="block">{cart.events.title}</span>
              <span className="block font-light text-sm text-muted-foreground">{cart.events.category}</span>
            </Link>
          </div>

          <div className="flex flex-col gap-4 self-end">
            <p className="text-lg md:text-2xl">{formatMoney(Number(cart.tickets.price))}</p>

            <div className="flex items-center gap-4 self-end text-muted-foreground">
              <p className="truncate">Quantity: {cart.quantity}</p>

              <Button
                variant={'ghost'}
                className="p-2"
                onClick={() => handleDelete(cart.tickets.id, cart.events.id)}
              >
                <Trash className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
