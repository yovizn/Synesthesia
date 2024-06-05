import { axiosInstance } from '@/lib/axios.config'
import { EditUserFormType } from '@/schemas/edit-user-schema'
import { getCookie } from 'cookies-next'

const editUserAciton = async (payload: EditUserFormType, username: string) => {
  const token = getCookie('access_token')
  return await axiosInstance().patch(
    `/echos/v2/${username}`,
    { ...payload },
    {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'multipart/form-data',
      },
    },
  )
}

export { editUserAciton }
