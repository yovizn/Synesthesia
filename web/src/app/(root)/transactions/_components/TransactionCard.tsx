'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardDescription, CardTitle, CardContent } from '@/components/ui/card'
import { toast } from '@/components/ui/use-toast'
import { axiosInstance } from '@/lib/axios.config'
import { cn } from '@/lib/utils'
import { TransactionsType } from '@/types/transaction'
import { renderImage } from '@/utils/action/render'
import { formatMoney } from '@/utils/format-any'
import axios, { AxiosError } from 'axios'
import { getCookie } from 'cookies-next'
import { headers } from 'next/headers'
import { useRouter } from 'next/navigation'

export default function TransactionCard({ item }: { item: TransactionsType }) {
  const router = useRouter()

  const handleBuy = async () => {
    console.log(item.id, 'ini')
    try {
      const token = getCookie('access_token')

      await axios.post(
        'http://localhost:8000/transactions/v1/' + item.id,
        {
          status: 'PAID',
        },
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        },
      )
      // await fetch(`/v1/${item.id}`, {
      //   method: 'POST',
      //   credentials: 'include',
      //   headers: {
      //     Authorization: 'Bearer ' + access_token,
      //   },
      //   body: JSON.stringify({
      //     status: "PAID"
      //   })
      // })
      // toast({
      //   title: 'Successed Buy',
      // })
      // await axiosInstance().post(
      //   `/v1/${item.id}`,
      //   {
      //     status: 'PAID',
      //   },
      //   // {
      //   //   headers: {
      //   //     Authorization: `Bearer ${token}`,
      //   //     // 'Content-Type': 'application/x-www-form-urlencoded',
      //   //   },
      //   //   // withCredentials: true,
      //   // },
      // )
      window.location.reload()
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          variant: 'destructive',
          title: error.response?.data.message,
        })
      }
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div>
            <CardDescription className="text-xs">NO. {item.invoiceNumber}</CardDescription>
            <CardTitle>{item.event.title}</CardTitle>
          </div>
          <div>
            <Badge
              variant={item.status === 'UNPAID' ? 'destructive' : 'default'}
              className="space-x-2"
            >
              <span>{item.status}</span>
              <span
                className={cn(
                  'size-3 rounded-full',
                  item.status === 'PENDING' ? 'bg-orange-600' : item.status === 'UNPAID' ? 'bg-muted' : 'bg-blue-600',
                )}
              />
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex justify-between">
          <div className="flex gap-4">
            <Avatar className="rounded-md">
              <AvatarImage src={renderImage.png(item.event.poster.name)} />
              <AvatarFallback className="rounded-md">T</AvatarFallback>
            </Avatar>
            <div>{formatMoney(Number(item.total))}</div>
          </div>

          <div>
            <Button onClick={handleBuy}>Pay</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
