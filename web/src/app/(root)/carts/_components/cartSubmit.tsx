'use client'

import { useAuthProvider } from '@/components/common/AuthProvider'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { toast } from '@/components/ui/use-toast'
import { axiosInstance } from '@/lib/axios.config'
import { CartType } from '@/types/cart.type'
import { AxiosError } from 'axios'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function CartSubmit({ data }: { data: CartType[] }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const user = useAuthProvider((state) => state.user)
  const [isPoint, setIsPoint] = useState(false)
  const [isVoucher, setIsVoucher] = useState(false)
  const ticketsItem = data.map((item) => ({
    id: item.tickets.id,
    price: item.tickets.price,
    quantity: item.quantity,
  }))

  const handleClick = async () => {
    try {
      setIsLoading(true)
      const action = await axiosInstance().post(`/transactions/system`, {
        usePoint: isPoint ? isPoint : undefined,
        use_voucher: isVoucher ? isVoucher : undefined,
        eventId: data[0].events.id,
        ticketsItem,
      })
      toast({
        title: action.data.title,
      })
      setIsLoading(false)
      router.push('/transactions')
    } catch (error) {
      setIsLoading(false)
      if (error instanceof AxiosError) {
        toast({
          variant: 'destructive',
          title: error.response?.data.message,
        })
      }
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {data[0].events.useVoucher ? (
          <Card className="flex w-fit items-center gap-4 p-4">
            <Label
              htmlFor="uv"
              className="uppercase"
            >
              use voucher
            </Label>
            <Switch onCheckedChange={(e) => setIsVoucher(e)} />
          </Card>
        ) : null}

        {user.point > 0 && (
          <Card className="flex w-fit items-center gap-4 p-4">
            <Label
              htmlFor="up"
              className="uppercase"
            >
              use point
            </Label>
            <Switch onCheckedChange={(e) => setIsPoint(e)} />
          </Card>
        )}
      </div>
      <div>
        <Button
          disabled={isLoading}
          onClick={handleClick}
          className="w-full text-center"
        >
          {!isLoading ? 'Buy' : <Loader2 className="size-4 animate-spin" />}
        </Button>
      </div>
    </div>
  )
}
