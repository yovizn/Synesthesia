import { axiosInstance } from '@/lib/axios.config'
import { LoginFormType } from '@/schemas/login-schema'

type LoginActionResponseType = {
  data: {
    title: string
    description: string
    access_token?: string
    refresh_token?: string
  }
}

const loginAction = async (payload: LoginFormType): Promise<LoginActionResponseType> => {
  const { username_email, password } = payload
  return await axiosInstance().post(
    '/echos/v2',
    {
      username_email,
      password,
    },
    {
      withCredentials: true,
    },
  )
}

export { loginAction }
