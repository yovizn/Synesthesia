import { axiosInstance } from '@/lib/axios.config'
import { EditEventType } from '@/schemas/create-event-schema'

const editEventAction = async (payload: EditEventType, id: string) => {
  return await axiosInstance().patch(
    `/events/v1/${id}`,
    { ...payload },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  )
}

export { editEventAction }
