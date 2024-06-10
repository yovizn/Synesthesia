import placeholder from '@/public/noiseporn-JNuKyKXLh8U-unsplash.jpg'
import { renderImage } from '@/utils/action/render'
import { getEvent } from '@/utils/session/getEvent'
import Image from 'next/image'

export const revalidate = 60

export default async function Home() {
  const events = await getEvent()

  return (
    <main className="min-h-screen w-full">
      <section className="flex h-screen items-center justify-center">
        {events.map((event) => {
          return (
            <div key={event.id}>
              <div>{event.title}</div>

              <Image
                src={event.poster?.name ? renderImage.webp(event.poster.name) : placeholder}
                alt={event.title}
                height={200}
                width={200}
              />
            </div>
          )
        })}
      </section>
      <section className="flex h-screen items-center justify-center bg-foreground text-background">Hello</section>
    </main>
  )
}
