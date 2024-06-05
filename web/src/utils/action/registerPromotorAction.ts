import { axiosInstance } from '@/lib/axios.config'
import { registerPromotorFormType } from '@/schemas/register-promotor-schema'

const registerPromotorAction = async (payload: registerPromotorFormType) => {
  return await axiosInstance().post(
    '/promotors/v1',
    { ...payload },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  )
}

export { registerPromotorAction }
