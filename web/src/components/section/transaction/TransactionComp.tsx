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
import { axiosInstance } from '@/lib/axios.config'

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

  // const cart = await axiosInstance
  
  return (
    <div className="mx-auto w-full max-w-screen-xl space-y-6 px-6">
      <div className="flex w-full flex-col items-center justify-between md:flex-row">
        <p className="px-4 py-10 font-light uppercase">Transaction</p>
        <p className="text-2xl font-bold uppercase">{title}</p>
      </div>

      <div className="space-y-4"></div>
    </div>
  )
}
