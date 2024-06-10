import { getEvents } from '@/utils/session/get-events'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Event',
}

export default async function EventPage() {
  const event = await getEvents()

  console.log(event)

  return <div className="size-full">EventPage</div>
}
