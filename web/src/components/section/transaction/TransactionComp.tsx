'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

import placeholder from '@/public/noiseporn-JNuKyKXLh8U-unsplash.jpg'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TransactionItems, useCartStore } from '@/stores/cart-store'

import { EventDetailType } from '@/types/event.type'
import { renderImage } from '@/utils/action/render'
import { formatMoney } from '@/utils/format-any'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Minus, Plus } from 'lucide-react'

export default function TransactionComp({ data }: { data: EventDetailType }) {
  const {
    id,
    title,
    slug,
    category,
    city,
    Tickets,
    description,
    venueType,
    location,
    startAt,
    endAt,
    poster,
    posterId,
    promotorId,
    useVoucher,
    createdAt,
    updatedAt,
  } = data

  const { items, incQty, decQty } = useCartStore((state) => state)

  console.log(items)

  return (
    <div className="mx-auto w-full max-w-screen-xl space-y-6 px-6">
      <div className="flex w-full flex-col items-center justify-between md:flex-row">
        <p className="px-4 py-10 font-light uppercase">Transaction</p>
        <p className="text-2xl font-bold uppercase">{title}</p>
      </div>

      <div className="space-y-4">
        {items.map((ticket) => (
          <Card
            key={ticket?.id}
            className="flex w-full items-center justify-between px-4 py-6"
          >
            <div className="flex items-center gap-6">
              <Image
                src={data.poster?.name ? renderImage.webp(data.poster?.name) : placeholder}
                alt={`ticket ${ticket?.type} poster`}
                height={100}
                width={100}
                className="aspect-square rounded-xl object-cover"
              />
              <CardHeader className="self-start p-0">
                <CardTitle className="truncate">{title}</CardTitle>
                <CardDescription>{ticket?.type}</CardDescription>
              </CardHeader>
            </div>

            <CardContent className="flex flex-col space-y-6 self-end p-0">
              <CardDescription className="text-end font-semibold md:text-lg">
                {ticket?.price ? formatMoney(ticket.price) : 'FREE'}
              </CardDescription>
              <Badge
                variant={'outline'}
                className="w-24 justify-between p-0"
              >
                <Button
                  className="p-0 px-0.5"
                  variant={'ghost'}
                  disabled={ticket.quantity <= 0}
                  onClick={() => decQty(ticket.id)}
                >
                  <Minus className="size-4" />
                </Button>
                <span className="block">{ticket.quantity}</span>
                <Button
                  className="p-0 px-0.5"
                  variant={'ghost'}
                  onClick={() => incQty(ticket.id)}
                >
                  <Plus className="size-4" />
                </Button>
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
