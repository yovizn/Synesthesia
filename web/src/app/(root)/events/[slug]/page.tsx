import EventDetailDescription from '@/components/common/dashboard/events/detail/Decription'
import EventDetailIntro from '@/components/common/dashboard/events/detail/Intro'
import EventDetailSection from '@/components/common/dashboard/events/detail/Section'
import { getEventsDetail } from '@/utils/session/getEvent'
import { notFound } from 'next/navigation'

export default async function EventDetailPage({ params }: { params: { slug: string } }) {
  const eventDetail = await getEventsDetail(params.slug)
  
  if (!eventDetail) notFound()

  return (
    <main className="min-h-screen w-full">
      <EventDetailIntro data={eventDetail} />
      <EventDetailDescription data={eventDetail} />
      <EventDetailSection data={eventDetail} />
    </main>
  )
}
