import { axiosInstance } from '@/lib/axios.config'
import { ForgetPasswordType } from '@/schemas/forget-password-schema'

const forgetPasswordAction = async (
  { password }: ForgetPasswordType,
  id: string,
  username: string,
): Promise<{ data: { title: string; description: string } }> => {
  console.log('password', { password })
  console.log('id', id)
  console.log('username', username)

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
