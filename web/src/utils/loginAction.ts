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

const loginAction = async (payload: LoginFormType) => {
  const { username_email, password } = payload
  const res: LoginActionResponseType = await axiosInstance().post(
    '/echos/v2',
    {
      username_email,
      password,
    },
    {
      withCredentials: true,
    },
  )

  return res
}

export { loginAction }
