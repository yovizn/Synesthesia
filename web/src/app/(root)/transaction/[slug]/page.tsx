import TransactionComp from '@/components/section/transaction/TransactionComp'
import { getEventsDetail } from '@/utils/session/getEvent'

export default async function TransactionPage({ params }: { params: { slug: string } }) {
  const event = await getEventsDetail(params.slug)

  return (
    <main className="flex min-h-screen w-full flex-col">
      <section className="size-full">
        <TransactionComp data={event} />
      </section>
    </main>
  )
}
