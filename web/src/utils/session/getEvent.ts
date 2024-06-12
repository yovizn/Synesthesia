import { axiosInstance } from '@/lib/axios.config'
import { EventType } from '@/types/event.type'

const getEvent = async (): Promise<EventType[]> => {
  const event = await axiosInstance().get('/events/v1')
  return event.data
}

const getEventsDetail = async (slug: string) => {
  const eventDetail = await axiosInstance().get(`/events/v1/${slug}`)
  return eventDetail.data
}

const getEventCategory = async (category: string): Promise<EventType[]> => {
  const eventCategory = await axiosInstance().get(`/events/v2/${category}`)
  return eventCategory.data
}

export { getEvent, getEventsDetail, getEventCategory }
