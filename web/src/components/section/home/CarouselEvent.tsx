'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel'

import placeholder from '@/public/noiseporn-JNuKyKXLh8U-unsplash.jpg'
import Autoplay from 'embla-carousel-autoplay'

import { cn } from '@/lib/utils'
import { EventType } from '@/types/event.type'
import { renderImage } from '@/utils/action/render'
import { formatDistance, formatMoney } from '@/utils/format-any'
import Image from 'next/image'
import Link from 'next/link'
import Paragraph from '@/components/ui/p'
import { useEffect, useRef } from 'react'

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
      className={cn('mx-auto w-full max-w-screen-sm md:max-w-screen-xl', className)}
    >
      <CarouselContent>
        {events.map((event) => {
          const price = event.Tickets?.filter((t) => t.type === 'REGULER')

          return (
            <CarouselItem
              key={event.id}
              className="basis-full md:basis-1/5"
            >
              <div className="h-96">
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
                        <span className="block">{formatDistance(new Date(event.createdAt))}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="">
                      <Paragraph>{price?.map((p) => formatMoney(p.price))}</Paragraph>
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
