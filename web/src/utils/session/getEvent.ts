import { axiosInstance } from '@/lib/axios.config'
import { EventType } from '@/types/event.type'

const getEvent = async (): Promise<EventType[]> => {
  const event = await axiosInstance().get('/events/v1')
  return event.data
}

export { getEvent }
