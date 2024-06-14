'use client'

import { useAuthProvider } from '@/components/common/AuthProvider'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { toast } from '@/components/ui/use-toast'
import { axiosInstance } from '@/lib/axios.config'
import { CartType } from '@/types/cart.type'
import { AxiosError } from 'axios'
import { useEffect, useRef, useState } from 'react'

export default function BuyButton({ data }: { data: CartType[] }) {
  const { point } = useAuthProvider((state) => state.user)
  const [isVoucher, setIsVoucher] = useState(false)
  const [isPoint, setIsPoint] = useState(false)
  const ticketsItem = data.map((cart) => ({
    id: cart.tickets.id,
    price: Number(cart.tickets.price),
    quantity: cart.quantity,
  }))

  const handleBuy = async () => {
    try {
      const action = await axiosInstance().post('', {
        usePoint: isPoint,
        use_voucher: isVoucher,
        eventId
      })
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          title: error.response?.data.message,
          variant: 'destructive',
        })
      }
    }
  }

  console.log()

  useEffect(() => {}, [])

  return (
    <div className="flex w-full md:justify-between">
      <div className="flex gap-4">
        <div className="space-x-2 rounded-md border bg-background p-4">
          <Label
            className="font-light uppercase text-muted-foreground md:text-lg"
            htmlFor="use_voucher"
          >
            Use Voucher
          </Label>
          <Switch
            id="use_voucher"
            onCheckedChange={(e) => setIsVoucher(e)}
          />
        </div>

        <div className="space-x-2 rounded-md border bg-background p-4">
          <Label
            className="font-light uppercase text-muted-foreground md:text-lg"
            htmlFor="use_point"
          >
            Use Point
          </Label>
          <Switch id="use_point" />
        </div>
      </div>
      <Button className="min-w-24">Buy</Button>
    </div>
  )
}
