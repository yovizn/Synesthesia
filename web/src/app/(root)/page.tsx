import CarouselEvent from '@/components/section/home/CarouselEvent'
import CategoryEvent from '@/components/section/home/CategoryEvent'
import SearchBar from './_components/SearchBar'
import EventFilter from './_components/EventFilter'

import { getEvent } from '@/utils/session/getEvent'
import { useState } from 'react'

export const revalidate = 60

export default async function Home() {
  const events = await getEvent()
  const [selectedCategory, setSelectedCategory] = useState<string>('')

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
  }

  const filteredEvents = selectedCategory ? events.filter((event) => event.category === selectedCategory) : events

  return (
    <main className="min-h-screen w-full">
      <SearchBar data={events} />
      <section className="my-24 flex flex-col gap-8 px-12 md:flex-col">
        <CarouselEvent events={events} />
      </section>
      <section className="min-h-screen w-full">
        <EventFilter
          events={events}
          onCategoryChange={handleCategoryChange}
        />
        <div className="my-24 flex flex-col gap-8 px-12 md:flex-col">
          <CategoryEvent events={filteredEvents} />
        </div>
      </section>
    </main>
  )
}
