import { create } from 'zustand'
import { UserType } from '@/types/user.type'

type State = { user: UserType }

type AuthAction = {
  setUser: (user: UserType) => void
  resetUser: () => void
}

const defaultUser: UserType = {
  id: '',
  avatar: null,
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
  expPoint: null,
  referral: '',
  _count: { Transaction: 0 },
}

const useAuthProvider = create<State & AuthAction>()((set) => ({
  user: defaultUser,
  setUser: (user) => set(() => ({ user })),
  resetUser: () => set({ user: defaultUser }),
}))

export default useAuthProvider
