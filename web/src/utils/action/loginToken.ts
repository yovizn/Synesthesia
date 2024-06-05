import { jwtDecode } from 'jwt-decode'
import { getCookie } from 'cookies-next'

import { UserType } from '@/types/user.type'

const loginToken = () => {
  const token = getCookie('access_token') || ''
  if (token) {
    const user: UserType = jwtDecode(token)
    return user
  }
  return
}

export { loginToken }
