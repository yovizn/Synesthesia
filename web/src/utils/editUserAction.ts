// 'use server'

import { axiosInstance } from '@/lib/axios.config'
import { EditUserFormType } from '@/schemas/edit-user-schema'
import { getCookie } from 'cookies-next'
import { cookies } from 'next/headers'

const editUserAciton = async (payload: EditUserFormType, username: string) => {
  // const token = cookies().get('access_token')?.value
  console.log(payload)
  const token = getCookie('access_token')
  return await axiosInstance().patch(
    `/echos/v2/${username}`,
    { ...payload },
    {
      headers: {
        Authorization: 'Bearer ' + token,
        // 'Content-Type': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    },
  )
}

export { editUserAciton }
