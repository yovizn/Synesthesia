import { getEventsDetail } from '@/utils/session/getEvent'
import { notFound } from 'next/navigation'
import EventDetailDescription from '../_components/page/Decription'
import EventDetailIntro from '../_components/page/Intro'
import EventDetailSection from '../_components/page/Section'

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
