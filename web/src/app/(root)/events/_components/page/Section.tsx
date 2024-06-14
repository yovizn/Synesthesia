'use client'

import { ElementRef, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

import Image from 'next/image'

import placeholder from '@/public/noiseporn-JNuKyKXLh8U-unsplash.jpg'
import { EventDetailType } from '@/types/event.type'
import { renderImage } from '@/utils/action/render'

export default function EventDetailSection({ data }: { data: EventDetailType }) {
  const container = useRef<ElementRef<'div'>>(null)

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  return (
    <div
      ref={container}
      className="relative flex h-screen items-center justify-center overflow-hidden"
      style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
    >
      <div className="relative z-10 flex h-full w-full flex-col justify-between p-20 text-white mix-blend-difference">
        <p className="w-[50vw] self-end text-[2vw] uppercase mix-blend-difference">{data.title}</p>
        <p className="text-[5vw] uppercase mix-blend-difference">{data.category}</p>
      </div>
      <div className="fixed left-0 top-[-10vh] h-[120vh] w-full">
        <motion.div
          style={{ y }}
          className="relative h-full w-full"
        >
          <Image
            src={data.poster?.name ? renderImage.webp(data.poster?.name) : placeholder}
            fill
            alt={data.title}
            style={{ objectFit: 'cover' }}
          />
        </motion.div>
      </div>
    </div>
  )
}
