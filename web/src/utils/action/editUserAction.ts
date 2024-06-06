import { axiosInstance } from '@/lib/axios.config'
import { EditUserFormType } from '@/schemas/edit-user-schema'

const editUserAciton = async (payload: EditUserFormType, username: string) => {
  return await axiosInstance().patch(
    `/echos/v2/${username}`,
    { ...payload },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  )
}

export { editUserAciton }
