import { axiosInstance } from '@/lib/axios.config'
import { EmailFormType } from '@/schemas/email-schema'

const emailAction = async (
  payload: EmailFormType,
): Promise<{ data: { title: string; description: string; refresh_token: string } }> => {
  const { email } = payload
  console.log(email)

  return await axiosInstance().post('/echos/validations', { email })
}

export { emailAction }
