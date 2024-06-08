import { axiosInstance } from '@/lib/axios.config'
import { CreateEventType } from '@/schemas/create-event-schema'

const createEventAction = async (payload: CreateEventType) => {
  return await axiosInstance().post(
    `/events/v1`,
    { ...payload },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  )
}

export { createEventAction }
