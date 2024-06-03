import { axiosInstance } from '@/lib/axios.config'
import { EmailFormType } from '@/schemas/email-schema'

const emailAction = async ({
  email,
}: EmailFormType): Promise<{ data: { title: string; description: string; forget_password_token: string } }> => {
  return await axiosInstance().post('/echos/validations', { email })
}

export { emailAction }
