import { API_BASE_URL } from "@/configs/env"
import { TransactionsType } from "@/types/transaction"
import { cookies } from "next/headers"

export const getTrasaction = async ():Promise<TransactionsType[]> => {
  const access_token = cookies().get('access_token')?.value || ''
  return await fetch(`${API_BASE_URL}/transactions/system`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Authorization: 'Bearer ' + access_token,
    },
  }).then((res) => res.json())

}