'use client'

import { EventDetailType } from '@/types/event.type'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ElementRef, useRef } from 'react'

import placeholder from '@/public/noiseporn-JNuKyKXLh8U-unsplash.jpg'
import Image from 'next/image'
import { renderImage } from '@/utils/action/render'
import H1 from '@/components/ui/h1'
import Paragraph from '@/components/ui/p'
import { AlarmClockCheck, MapPin } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'

export default function EventDetailIntro({ data }: { data: EventDetailType }) {
  const container = useRef<ElementRef<'div'>>(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <div className="min-h-screen">
      <div className="relative z-10 mx-auto flex w-full max-w-screen-2xl justify-between px-4 py-10">
        <div>
          <H1 className="uppercase">{data.title}</H1>
          <Paragraph className="flex items-center gap-1.5 text-foreground/70">
            <MapPin className="block size-4" />
            <span className="block">
              {data.location}, {data.city}
            </span>
          </Paragraph>
        </div>

        <div>
          <div className="space-y-2 text-end font-extralight uppercase text-muted-foreground">
            <span>Start on</span>
            <Badge
              className="flex items-center gap-1.5"
              variant={'secondary'}
            >
              <AlarmClockCheck className="size-4" />
              <span className="">{format(data.startAt, 'PPP')}</span>
            </Badge>
            <Badge>{data.venueType}</Badge>
          </div>
        </div>
      </div>
      <div
        ref={container}
        className="h-screen overflow-hidden"
      >
        <motion.div
          style={{ y }}
          className="relative h-full"
        >
          <Image
            src={data.poster?.name ? renderImage.webp(data.poster?.name) : placeholder}
            alt={data.title}
            fill
            className="object-cover"
          />
        </motion.div>
      </div>
    </div>
  )
}
