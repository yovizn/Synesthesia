import { axiosInstance } from '@/lib/axios.config'
import { EmailFormType } from '@/schemas/email-schema'

const emailAction = async (
  payload: EmailFormType,
): Promise<{ data: { title: string; description: string; forget_password_token: string } }> => {
  const { email } = payload

  return await axiosInstance().post('/echos/validations', { email })
}

export { emailAction }
