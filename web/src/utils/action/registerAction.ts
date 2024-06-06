'use server'

import { axiosInstance } from '@/lib/axios.config'
import { RegisterFormType } from '@/schemas/register-schema'

const registerAction = async (payload: RegisterFormType) => {
  return await axiosInstance().post(
    '/echos/v1',
    {
      ...payload,
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  )
}

export { registerAction }
