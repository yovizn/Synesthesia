import { axiosInstance } from '@/lib/axios.config'
import { getCookie } from 'cookies-next'

export const deleteCart = async (ticketsId: string, eventId: string) => {
  console.log(ticketsId, eventId)
  const token = getCookie('access_token')
  const { data } = await axiosInstance().post(
    '/carts/shinks',
    {
      ticketsId,
      eventId,
    },
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // },
  )

  return data
}
