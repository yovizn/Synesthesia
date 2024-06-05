'use client'

import createAuthStore, { AuthStore } from '@/stores/auth-provider'
import { UserType } from '@/types/user.type'
import { loginToken } from '@/utils/action/loginToken'
import { getCookie } from 'cookies-next'
import { jwtDecode } from 'jwt-decode'
import { createContext, useContext, useEffect, useRef } from 'react'
import { StoreApi, useStore } from 'zustand'

export const AuthStoreContext = createContext<StoreApi<AuthStore> | null>(null)

export const useAuthProvider = <T,>(selector: (store: AuthStore) => T): T => {
  const authStoreContext = useContext(AuthStoreContext)
  if (!authStoreContext) throw new Error('useAuthProvider must be use within AuthStoreProvider')
  return useStore(authStoreContext, selector)
}
export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<StoreApi<AuthStore>>()
  if (!storeRef.current) {
    storeRef.current = createAuthStore()
  }

  return (
    <AuthStoreContext.Provider value={storeRef.current}>
      <AuthWrapper>{children}</AuthWrapper>
    </AuthStoreContext.Provider>
  )
}

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const { setUser } = useAuthProvider((state) => state)
  const access_token = getCookie('access_token') || ''
  useEffect(() => {
    if (access_token) {
      const payload = jwtDecode(access_token) as UserType
      setUser(payload)
    }
  }, [access_token])

  return children
}
