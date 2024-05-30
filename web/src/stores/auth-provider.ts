import { create } from 'zustand'
import { UserType } from '@/types/user.type'

type State = { user: UserType }

type AuthAction = {
  setUser: (user: UserType) => void
  resetUser: () => void
}

const defaultUser: UserType = {
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

const useAuthProvider = create<State & AuthAction>()((set) => ({
  user: defaultUser,
  setUser: (user) => set(() => ({ user })),
  resetUser: () => set({ user: defaultUser }),
}))

export default useAuthProvider
