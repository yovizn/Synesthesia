import CarouselEvent from '@/components/section/home/CarouselEvent'
import CategoryEvent from '@/components/section/home/CategoryEvent'

import { getEvent, getEventCategory } from '@/utils/session/getEvent'

export const revalidate = 60

export default async function Home() {
  const events = await getEvent()

  const POP = events.filter((event) => event.category === 'POP')

  return (
    <main className="min-h-screen w-full">
      <section className="my-24">
        <CarouselEvent events={events} />
      </section>
      <section className="flex h-screen items-center justify-center bg-foreground text-background">
        <CarouselEvent events={POP} />
      </section>
    </main>
  )
}
