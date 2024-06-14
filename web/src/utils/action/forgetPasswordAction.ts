import { axiosInstance } from '@/lib/axios.config'
import { ForgetPasswordType } from '@/schemas/forget-password-schema'

const forgetPasswordAction = async (
  { password }: ForgetPasswordType,
  id: string,
  username: string,
): Promise<{ data: { title: string; description: string } }> => {
  return await axiosInstance().post(
    `/echos/validations/${id}`,
    { password },
    {
      timeout: 15000,
      headers: {
        Authorization: 'Bearer ' + username,
      },
    },
  )
}

export { forgetPasswordAction }
