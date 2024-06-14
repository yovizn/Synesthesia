import { getCartDetail } from '@/utils/session/getCart'
import { getEventsDetail } from '@/utils/session/getEvent'
import CartRecord from '../_components/cartRecord'
import CartSubmit from '../_components/cartSubmit'

export default async function CartPage({ params }: { params: { id: string } }) {
  const carts = await getCartDetail(params.id)
  // const event = await getEventsDetail(cart.events.slug)

  return (
    <main className="space-y-6 p-6">
      <CartSubmit data={carts} />
      <section className="space-y-4">
        {carts.map((cart, idx) => (
          <CartRecord
            cart={cart}
            key={cart.tickets.id + idx}
          />
        ))}
      </section>
    </main>
  )
}
