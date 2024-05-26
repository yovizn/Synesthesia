import axios from 'axios'
import { getCookie } from 'cookies-next'

const axiosInstance = () => {
  const token = getCookie('access-token')
  return axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export { axiosInstance }
