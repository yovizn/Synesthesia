import { create } from 'zustand'
import { UserType } from '@/types/user.type'

type State = { user: UserType }

type AuthAction = {
  setUser: (user: UserType) => void
  resetUser: () => void
}

const defaultUser: UserType = {
  id: '',
  imageId: '',
  firstname: '',
  lastname: '',
  username: '',
  email: '',
  birth: undefined,
  gender: undefined,
  address: undefined,
  referral: '',
  referrance: '',
  point: 0,
  phoneNumber: '',
  expPoint: undefined,
}

const useAuthProvider = create<State & AuthAction>()((set) => ({
  user: defaultUser,
  setUser: (user) => set(() => ({ user })),
  resetUser: () => set({ user: defaultUser }),
}))

export default useAuthProvider
