'use client'

import { cn } from '@/lib/utils'
import { formatMoney } from '@/utils/format-any'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../../../components/ui/card'
import { TicketType } from '@/types/ticket.type'
import { Button } from '../../../../components/ui/button'
import { useState } from 'react'
import { Minus, Plus, ShoppingBag } from 'lucide-react'
import { AxiosError } from 'axios'
import { toast } from '../../../../components/ui/use-toast'
import { axiosInstance } from '@/lib/axios.config'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface TicketCardProps {
  ticket: TicketType
  eventId: string
  toleranceDate: boolean
  toleranceCapacity: boolean
  eventSlug: string
}

export default function TicketCard({ ticket, eventId, toleranceDate, toleranceCapacity }: TicketCardProps) {
  const [count, setCount] = useState(0)
  const [isAddCart, setIsAddCart] = useState(false)
  const router = useRouter()
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<{
    ticketId: string
    eventId: string
    quantity: number
  }>()

  const handleAddToCart = async () => {
    try {
      const data = await axiosInstance().post('/carts/', {
        ticketsId: ticket?.id,
        eventId: eventId,
        quantity: count,
      })
      setIsAddCart(true)
      toast({
        title: data.data.title,
      })
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          variant: 'destructive',
          title: error.response?.data.message,
        })
      }
      console.log(error)
    }
  }

  return (
    <Card
      key={ticket?.id}
      className={cn('relative space-y-2 rounded-sm px-10 shadow-none', toleranceDate ? 'opacity-100' : 'opacity-50')}
    >
      <CardHeader>
        <CardTitle className="mb-3">{ticket?.type}</CardTitle>
        <CardDescription>
          <p>
            - Include Tax
            <br />- Price exclude Service Fee & Admin Fee
          </p>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-col-reverse gap-2 text-muted-foreground md:flex-row md:justify-between">
          <div className="space-y-4">
            <span className="block">Capacity:</span>
            <span className="block text-foreground">{ticket?.capacity}</span>
          </div>

          <div className="md:self-end">
            <span className="block text-4xl">
              {Number(ticket?.price) < 1 || ticket?.price ? formatMoney(ticket?.price!) : 'FREE'}
            </span>
          </div>
        </div>

        <div className="flex w-full flex-col-reverse justify-between gap-4 md:flex-row">
            <Button
              variant={'outline'}
              disabled={isAddCart || isSubmitting || !toleranceDate || toleranceCapacity}
              className="w-full space-x-2 md:w-40 md:self-end"
              onClick={handleSubmit(handleAddToCart)}
            >
              <ShoppingBag className="size-4" />
              <span>Add to cart</span>
            </Button>

          <div className="flex w-fit items-center rounded-md border">
            <Button
              disabled={count < 1}
              onClick={() => setCount((state) => state - 1)}
              variant={'ghost'}
              className="px-2"
            >
              <Minus className="size-4" />
            </Button>

            <span className="block">{count}</span>

            <Button
              disabled={count > ticket?.capacity! || count > 9}
              onClick={() => setCount((state) => state + 1)}
              variant={'ghost'}
              className="px-2"
            >
              <Plus className="size-4" />
            </Button>
          </div>
        </div>
      </CardContent>

      <div className="absolute left-0 top-1/2 size-20 -translate-x-1/2 -translate-y-1/2 rounded-full border-r bg-background"></div>
      <div className="absolute right-0 top-1/2 size-20 -translate-y-1/2 translate-x-1/2 rounded-full border-l bg-background"></div>
    </Card>
  )
}
