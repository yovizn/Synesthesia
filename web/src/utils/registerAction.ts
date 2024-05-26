import { axiosInstance } from '@/lib/axios.config'
import { RegisterFormType } from '@/schemas/register-schema'

const registerAction = async (payload: RegisterFormType) => {
  const { username, email, referrance, firstname, lastname, password, gender } =
    payload
  return await axiosInstance().post('/echos/v1', {
    username,
    email,
    referrance,
    firstname,
    lastname,
    password,
    gender,
  })
}

export { registerAction }
