import { create } from 'zustand'
import { UserType } from '@/types/user.type'

export type AuthState = { user: UserType }

type AuthAction = {
  setUser: (user: UserType) => void
  resetUser: () => void
}
export type AuthStore = AuthState & AuthAction

export const defaultUser: AuthState = {
  user: {
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
    image: null,
    Promotor: null,
  },
}

const createAuthStore = (initState: AuthState = defaultUser) =>
  create<AuthStore>()((set) => ({
    ...initState,
    setUser: (user) => set(() => ({ user })),
    resetUser: () => set({ user: defaultUser.user }),
  }))

export default createAuthStore
