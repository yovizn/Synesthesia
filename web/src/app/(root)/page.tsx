import placeholder from '@/public/noiseporn-JNuKyKXLh8U-unsplash.jpg'
import { renderImage } from '@/utils/action/render'
import { getEvent } from '@/utils/session/getEvent'
import Image from 'next/image'
import Link from 'next/link'

export const revalidate = 60

export default async function Home() {
  const events = await getEvent()

  return (
    <main className="min-h-screen w-full">
      <section className="flex h-screen items-center justify-center">
        {events.map((event) => {
          return (
            <Link href={`/events/${event.slug}`} key={event.id}>
              <div>{event.title}</div>

              <Image
                src={event.poster?.name ? renderImage.webp(event.poster.name) : placeholder}
                alt={event.title}
                height={200}
                width={200}
              />
            </Link>
          )
        })}
      </section>
      <section className="flex h-screen items-center justify-center bg-foreground text-background">Hello</section>
    </main>
  )
}
