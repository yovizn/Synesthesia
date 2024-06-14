import { getEventsDetail } from '@/utils/session/getEvent'

export default async function CartDetailPage({ params }: { params: { id: string } }) {
  const event = await getEventsDetail(params.id)
  console.log(event)
  return <div>CartDetailPage</div>
}
