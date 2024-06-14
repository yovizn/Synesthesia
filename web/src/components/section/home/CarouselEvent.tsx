'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel'

import placeholder from '@/public/noiseporn-JNuKyKXLh8U-unsplash.jpg'
import Autoplay from 'embla-carousel-autoplay'

import { cn } from '@/lib/utils'
import { EventType } from '@/types/event.type'
import { PromotorType } from '@/types/promotor.type'
import { renderImage } from '@/utils/action/render'
import { formatDistance, formatMoney } from '@/utils/format-any'
import { format, formatDate } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import Paragraph from '@/components/ui/p'
import { Separator } from '@/components/ui/separator'
import { useEffect, useRef } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface ICarouselEvent {
  className?: string
  events: EventType[]
}

export default function CarouselEvent({ events, className }: ICarouselEvent) {
  const plugin = useRef(
    Autoplay({
      delay: 2000,
      stopOnInteraction: true,
    }),
  )

  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      className={cn('mx-auto w-full max-w-screen-sm space-y-5 md:max-w-screen-xl', className)}
    >
      <Paragraph className="-space-y-80 text-2xl">Event Pilihan</Paragraph>
      <CarouselContent>
        {events.map((event) => {
          const price = event.Tickets?.filter((t) => t.type === 'REGULER')
          return (
            <CarouselItem
              key={event.id}
              className="basis-full md:basis-1/5"
            >
              <div className="h-fit">
                <Card className="h-full overflow-hidden">
                  <div className="relative h-[200px] w-full">
                    <Image
                      src={event.poster?.name ? renderImage.webp(event.poster.name) : placeholder}
                      alt={event.title}
                      fill
                      className="aspect-video object-cover"
                    />
                  </div>
                  <Link href={`/events/${event.slug}`}>
                    <CardHeader className="justify-between">
                      <CardTitle className="truncate">{event.title}</CardTitle>
                      <CardDescription className="flex w-full items-center justify-between">
                        <span className="block">{event.category}</span>
                        <span className="block">{format(new Date(event.createdAt), 'PPP')}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Paragraph>{price?.map((p) => formatMoney(p.price))}</Paragraph>
                      <Separator />
                      <div className="flex items-center gap-3">
                        <Avatar>
                          {event.promotor.promotorImage?.name ? (
                            <AvatarImage src={renderImage.webp(event.promotor.promotorImage?.name!)} />
                          ) : null}
                          <AvatarFallback className="uppercase">{event.promotor.promotorName[0]}</AvatarFallback>
                        </Avatar>
                        <p>{event.promotor.promotorName}</p>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              </div>
            </CarouselItem>
          )
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
