import { axiosInstance } from '@/lib/axios.config'
import { RegisterFormType } from '@/schemas/register-schema'

const registerAction = async (payload: RegisterFormType) => {
  const { username, email, referrance, firstname, lastname, password, gender, avatar } = payload
  return await axiosInstance().post(
    '/echos/v1',
    {
      username,
      email,
      avatar,
      referrance,
      firstname,
      lastname,
      password,
      gender,
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  )
}

export { registerAction }
