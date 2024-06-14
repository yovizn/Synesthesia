import { axiosInstance } from '@/lib/axios.config'
import { EventDetailType, EventType } from '@/types/event.type'

const getEvent = async (): Promise<EventType[]> => {
  const { data } = await axiosInstance().get('/events/v1')
  return data
}

const getEventsDetail = async (slug: string): Promise<EventDetailType> => {
  const { data } = await axiosInstance().get(`/events/v1/${slug}`)
  return data
}

const getEventCategory = async (category: string): Promise<EventType[]> => {
  const { data } = await axiosInstance().get(`/events/v2/${category}`)
  return data
}

export { getEvent, getEventsDetail, getEventCategory }
