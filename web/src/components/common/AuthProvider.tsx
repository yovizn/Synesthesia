'use client'

import useAuthProvider from '@/stores/auth-provider'
import { loginToken } from '@/utils/loginToken'
import { useEffect } from 'react'

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthProvider((state) => state.setUser)
  const user = loginToken()

  useEffect(() => {
    if (user) setUser(user)
      console.log(user)
  }, [])

  return children
}
