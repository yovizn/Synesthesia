type UserType = {
  id: string
  firstname: string
  lastname: string
  avatar: string | null
  username: string
  email: string
  address: string | null
  birth: Date | null
  gender?: 'MALE' | 'FEMALE'
  isVerified: boolean
  phoneNumber: number | null
  point: number
  expPoint: Date | null
  referral: string
  _count: { Transaction: number }
}

export { type UserType }
