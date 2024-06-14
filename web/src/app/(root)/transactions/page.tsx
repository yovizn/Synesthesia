import { getCart, getCartDetail } from '@/utils/session/getCart'
import Cart from './_components/Cart'
import { Button } from '@/components/ui/button'
import BuyButton from './_components/BuyButton'
import { getTrasaction } from '@/utils/session/getTransaction'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { renderImage } from '@/utils/action/render'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { formatMoney } from '@/utils/format-any'
import TransactionCard from './_components/TransactionCard'

export default async function TransactionPage() {
  const transactions = await getTrasaction()

  // const totat = carts.reduce((sum, val) => sum + val.tickets.price, 0)
  return (
    <main className="flex min-h-screen w-full flex-col px-6 pt-10">
      <section className="mx-auto size-full max-w-screen-md space-y-6">
        {transactions.map((item) => (
          <TransactionCard
            key={item.id}
            item={item}
          />
        ))}
      </section>
    </main>
  )
}
