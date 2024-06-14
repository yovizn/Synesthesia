'use client'
import { useState } from 'react'
import Select from '@/components/ui/select-filter'
import { EventType } from '@/types/event.type'

interface IEventFilter {
  className?: string
  events: EventType[]
  onCategoryChange: (category: string) => void
}

const CATEGORY_TYPE = ['ROCK', 'POP', 'METAL', 'JAZZ', 'REGGAE', 'EDM']

export default function EventFilter({ events, className, onCategoryChange }: IEventFilter) {
  const [selectedCategory, setSelectedCategory] = useState<string>('')

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value
    setSelectedCategory(category)
    onCategoryChange(category)
  }

  return (
    <div className="top-4 z-50 mx-auto mt-4 h-fit px-6 md:top-10 md:mt-10">
      <form>
        <div className="relative mx-auto w-full max-w-screen-lg">
          <div className="flex flex-col gap-2">
            <label htmlFor="category">Category</label>
            <Select
              className="mx-auto w-[200px] border"
              id="category"
              name="category"
              value={selectedCategory}
              onChange={handleFilterChange}
            >
              <option value="">All Categories</option>
              {CATEGORY_TYPE.map((category, index) => (
                <option
                  key={index}
                  value={category}
                >
                  {category}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </form>
    </div>
  )
}
