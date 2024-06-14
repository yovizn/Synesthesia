'use client'

import { EventDetailType } from '@/types/event.type'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ElementRef, useRef } from 'react'

import placeholder from '@/public/noiseporn-JNuKyKXLh8U-unsplash.jpg'
import Image from 'next/image'
import { renderImage } from '@/utils/action/render'
import H1 from '@/components/ui/h1'
import Paragraph from '@/components/ui/p'
import { AlarmClockCheck, Clock, MapPin } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { PersonIcon } from '@radix-ui/react-icons'
import { Separator } from '@/components/ui/separator'
import H3 from '@/components/ui/h3'
import { GeistMono } from 'geist/font/mono'

export default function EventDetailIntro({ data }: { data: EventDetailType }) {
  const container = useRef<ElementRef<'div'>>(null)
  const checkAvailabel = data.Tickets.reduce((sum, val) => sum + val?.capacity!, 0)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <div className="min-h-screen">
      <div className="relative z-10 mx-auto flex h-96 w-full max-w-screen-2xl flex-col justify-normal gap-24 px-6 py-10 md:flex-row md:justify-between md:gap-0">
        <div className="space-y-2 self-start">
          {data.useVoucher ? <Badge variant={'outline'}>Voucher Available</Badge> : null}
          <H1 className="max-w-screen-sm text-balance uppercase md:max-w-screen-lg">{data.title}</H1>
          <Paragraph className="flex items-center gap-1.5 text-foreground/70">
            <MapPin className="block size-4" />
            <span className="block">
              {data.location}, {data.city}
            </span>
          </Paragraph>
        </div>

        <Card className="h-fit w-full bg-muted md:w-[300px]">
          <CardHeader className="flex justify-between md:flex-row md:items-center">
            <CardTitle className="block uppercase">Start on</CardTitle>
            <Badge variant={checkAvailabel > 1 ? 'default' : 'destructive'}>
              {checkAvailabel > 1 ? (
                <div className="flex items-center gap-1.5">
                  <span className="block size-2.5 rounded-full bg-green-500" /> {checkAvailabel}
                </div>
              ) : (
                'SOLD OUT'
              )}
            </Badge>
          </CardHeader>
          <CardContent className="text-sm">
            <p className="flex items-center gap-0.5">
              <Clock className="size-4" />
              <span className="py-0.5">
                {data.startAt === data.endAt
                  ? format(data.startAt, 'PPP')
                  : `${format(data.startAt, 'MMMM do')} - ${format(data.endAt, 'PPP')}`}
              </span>
            </p>
            <p className="text-muted-foreground">{data.venueType}</p>
          </CardContent>
          <CardFooter className="flex-col space-x-4">
            <Separator className="bg-muted-foreground/20" />
            <div className="flex h-fit w-full items-center gap-4 pt-6">
              <Avatar>
                {data.promotor.promotorImage?.name ? (
                  <AvatarImage
                    src={renderImage.webp(data.promotor.promotorImage?.name)}
                    className="object-cover"
                  />
                ) : null}
                <AvatarFallback className="bg-background">
                  <PersonIcon className="size-5 text-muted-foreground" />
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1.5">
                <p className="text-sm font-light leading-none text-muted-foreground">Organized by</p>
                <p className="font-medium leading-none">{data.promotor.promotorName}</p>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
      <div
        ref={container}
        className="relative h-screen overflow-hidden"
      >
        <div className="absolute bottom-4 left-4 z-10 md:bottom-6 md:left-10 mix-blend-difference text-white">
          <H3 className={`${GeistMono.className} text-balance text-7xl md:text-9xl`}>
            <span className="block">{format(data.startAt, 'EE')}</span>
            <span className="block">{format(data.startAt, 'MMM do')}</span>
            <span className="block">{format(data.startAt, 'u')}</span>
          </H3>
        </div>

        <motion.div
          style={{ y }}
          className="relative h-screen w-full"
        >
          <Image
            src={data.poster?.name ? renderImage.png(data.poster?.name) : placeholder}
            alt={data.title}
            fill
            sizes='100vw'
            priority
            className="object-cover"
          />
        </motion.div>
      </div>
    </div>
  )
}
