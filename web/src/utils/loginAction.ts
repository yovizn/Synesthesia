import { axiosInstance } from '@/lib/axios.config'
import { LoginFormType } from '@/schemas/login-schema'

const loginAction = async (payload: LoginFormType) => {
  const { username_email, password } = payload
  return await axiosInstance().post('/echos/v2', {
    username_email,
    password,
  })
}

export { loginAction }
