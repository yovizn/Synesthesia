'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from 'recharts'
import placeholder from '@/public/noiseporn-JNuKyKXLh8U-unsplash.jpg'
import { EventType } from '@/types/event.type'
import { Separator } from '@/components/ui/separator'
import { formatDistance, formatMoney } from '@/utils/format-any'
import { format, formatDate } from 'date-fns'
import Link from 'next/link'
import Image from 'next/image'
import useDebounce from '@/hooks/useDebounce'
import { renderImage } from '@/utils/action/render'

const SearchBar = ({ data }: { data: EventType[] }) => {
  const [search, setSearch] = useState('')
  const debounceValue = useDebounce(search)
  const inputRef = useRef<React.ElementRef<'input'>>(null)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearch(e.target.value)
  }

  useEffect(() => {
    console.log(search)
  }, [search])

  return (
    <div className="sticky top-4 z-50 mx-auto mt-4 h-fit px-6 md:top-10 md:mt-10">
      <Card className="relative mx-auto w-full max-w-screen-lg">
        <Input
          type="text"
          ref={inputRef}
          onChange={handleSearchChange}
          placeholder="Search your Fucking event here!"
        />

        {debounceValue && (
          <Card className="absolute top-full mt-2 w-full bg-background">
            <CardHeader>
              <CardTitle>Events</CardTitle>
              <Separator />
            </CardHeader>
            <CardContent className="space-y-1.5">
              {data
                .filter((event) => event.title.includes(debounceValue))
                .slice(0, 5)
                .map((event) => (
                  <Link
                    className="block"
                    href={`/events/${event.slug}`}
                    key={event.id}
                  >
                    <div className="flex gap-2">
                      <div className="relative h-24 w-40 overflow-hidden rounded-md">
                        <Image
                          src={event.poster?.name ? renderImage.webp(event.poster.name) : placeholder}
                          alt={event.title}
                          fill
                          sizes="160px"
                          className="aspect-video object-cover"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="text-base font-semibold leading-5 text-gray-700">{event.title}</div>
                        <div className="flex flex-col text-xs text-gray-500">
                          {format(new Date(event.createdAt), 'PPPP')}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              {data.filter((event) => !event.title.includes(debounceValue)).length === data.length && (
                <CardDescription>Cannot find your fucking event</CardDescription>
              )}
            </CardContent>
          </Card>
        )}
      </Card>
    </div>
  )
}

export default SearchBar
