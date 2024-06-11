import { API_BASE_URL } from '@/configs/env'
import { PromotorType } from '@/types/promotor.type'
import { cookies } from 'next/headers'

export const getPromotor = async (): Promise<PromotorType> => {
  const access_token = cookies().get('access_token')?.value || ''
  return await fetch(`${API_BASE_URL}/promotors/v1`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Authorization: 'Bearer ' + access_token,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json())
}
