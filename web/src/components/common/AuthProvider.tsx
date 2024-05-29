'use client'

import { useAuthProvider } from '@/stores/auth-provider'
import { loginToken } from '@/utils/loginToken'
import { useEffect } from 'react'

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser } = useAuthProvider()
  const user = loginToken()

  useEffect(() => {
    setUser(user)
  }, [])

  return children
}
