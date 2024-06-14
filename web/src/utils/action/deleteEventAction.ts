import { axiosInstance } from '@/lib/axios.config'

const deleteEventAction = async ( id: string) => {
  return await axiosInstance().delete(`/events/v1/${id}`)
}

export { deleteEventAction }
