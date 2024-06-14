"use client"

import { Form } from '@/components/ui/form'
import { TransactionsType } from '@/types/transaction'
import { useForm } from 'react-hook-form'

export default function BuyForm({ data }: { data: TransactionsType[] }) {
  const form = useForm()

  const onSubmit = () => {

  }

  const handleBuy = async () => {
    try {
      const token = getCookie('access_token')
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
      await axiosInstance().post(
        `/v1/${item.id}`,
        {
          status: 'PAID',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // "Content-Type": "application/json"
          },
        },
      )
      router.push('/')
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>

      </form>
    </Form>
  )
}
