import CarouselEvent from '@/components/section/home/CarouselEvent'
import { getEvent } from '@/utils/session/getEvent'

export const revalidate = 60

export default async function Home() {
  const events = await getEvent()

  return (
    <main className="min-h-screen w-full">
      <section className="my-24">
        <CarouselEvent events={events} />
      </section>
      <section className="flex h-screen items-center justify-center bg-foreground text-background">Hello</section>
    </main>
  )
}
