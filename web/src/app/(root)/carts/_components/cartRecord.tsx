'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from '@/components/ui/use-toast'
import { axiosInstance } from '@/lib/axios.config'
import { CartType } from '@/types/cart.type'
import { renderImage } from '@/utils/action/render'
import { formatMoney } from '@/utils/format-any'
import { AxiosError } from 'axios'
import { Trash } from 'lucide-react'

export default function CartRecord({ cart }: { cart: CartType }) {
  const handleClick = async () => {
    try {
      const action = await axiosInstance().post('/carts/shinks', {
        ticketsId: cart.tickets.id,
        eventId: cart.events.id,
      })
      toast({
        title: action.data.title,
      })
      window.location.reload()
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          variant: 'destructive',
          title: error.response?.data.message,
        })
      }
    }
  }

  return (
    <Card>
      <div className="flex items-center justify-between">
        <CardHeader>
          <CardTitle>{cart.events.title}</CardTitle>
          <CardDescription>{formatMoney(Number(cart.tickets.price))}</CardDescription>
        </CardHeader>

        <div className="p-2">
          <Button
            variant={'ghost'}
            onClick={handleClick}
          >
            <Trash className="size-4" />
          </Button>
        </div>
      </div>

      <CardContent className="flex w-full justify-between">
        <div className="flex gap-6">
          <Avatar className="rounded-md">
            <AvatarImage src={renderImage.png(cart.events.poster.name)} />
            <AvatarFallback>X</AvatarFallback>
          </Avatar>

          <div>
            <span className="block">{cart.tickets.type}</span>
            <span className="block">{cart.events.category}</span>
          </div>
        </div>

        <div>
          <span className="block">{cart.quantity} Ticket&apos;s</span>
        </div>
      </CardContent>
    </Card>
  )
}
