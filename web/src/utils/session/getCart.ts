import { API_BASE_URL } from '@/configs/env'
import { CartType } from '@/types/cart.type'
import { cookies } from 'next/headers'

export const getCart = async (): Promise<CartType[]> => {
  const access_token = cookies().get('access_token')?.value || ''
  return await fetch(`${API_BASE_URL}/carts/`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Authorization: 'Bearer ' + access_token,
    },
  }).then((res) => res.json())
}

export const getCartDetail = async (eventId: string): Promise<CartType[]> => {
  const access_token = cookies().get('access_token')?.value || ''
  return await fetch(`${API_BASE_URL}/carts/${eventId}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Authorization: 'Bearer ' + access_token,
    },
  }).then((res) => res.json())
}
