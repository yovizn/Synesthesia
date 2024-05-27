import { create } from 'zustand'
import { UserType } from '@/types/user.type'

type AuthProvider = {
  user: UserType
  setUser: (user: UserType) => void
}

const defaultUser ={
    id: '',
  firstname: '',
  lastname: '',
  username: '',
  email: '',
  address: null,
  birth: null,
  gender: undefined,
  isVerified: false,
  phoneNumber: null,
  point: 0,
  referral: '',
  }

const useAuthProvider = create<AuthProvider>()((set) => ({
  user: defaultUser,
  setUser: (user) => set({ user }),
}))

export { useAuthProvider, defaultUser }
