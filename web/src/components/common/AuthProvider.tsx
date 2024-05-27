import { jwtDecode } from 'jwt-decode'
import { useEffect, useMemo } from 'react'
import { getCookie } from 'cookies-next'

import { useAuthProvider } from '@/stores/auth-provider'
import { UserType } from '@/types/user.type'

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  return children
}
