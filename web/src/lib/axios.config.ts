import axios from 'axios'
import { getCookie } from 'cookies-next'

import { API_BASE_URL } from '@/configs/env'

const axiosInstance = () => {
  const token = getCookie('access_token')
  return axios.create({
    baseURL: API_BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export { axiosInstance }
