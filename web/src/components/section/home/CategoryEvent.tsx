import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import placeholder from '@/public/noiseporn-JNuKyKXLh8U-unsplash.jpg'
import { cn } from '@/lib/utils'
import { EventType } from '@/types/event.type'
import { renderImage } from '@/utils/action/render'
import { formatDistance, formatMoney } from '@/utils/format-any'
import Image from 'next/image'
import Link from 'next/link'
import Paragraph from '@/components/ui/p'

interface ICategoryEvent {
  className?: string
  events: EventType[]
}

export default function CategoryEvent({ events, className }: ICategoryEvent) {
  return (
    <div className={cn('mx-auto w-full max-w-screen-xl space-y-5', className)}>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-5">
        {events.map((event) => {
          const price = event.Tickets?.filter((t) => t.type === 'REGULER')
          return (
            <div
              key={event.id}
              className="h-fit"
            >
              <Link href={`/events/${event.slug}`}>
                <Card className="h-full overflow-hidden">
                  <div className="relative h-[100px] w-full">
                    <Image
                      src={event.poster?.name ? renderImage.webp(event.poster.name) : placeholder}
                      alt={event.title}
                      fill
                      className="aspect-video object-cover"
                    />
                  </div>
                  <CardHeader className="h-[100px] justify-between">
                    <CardTitle className="truncate">{event.title}</CardTitle>
                    <CardDescription className="flex w-full items-center justify-between">
                      <span className="block">{event.category}</span>
                      <span className="block">{formatDistance(new Date(event.createdAt))}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[50px] space-y-3">
                    <Paragraph>{price?.map((p) => formatMoney(p.price))}</Paragraph>
                    <div className="flex items-center gap-3"></div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
