type UserType = {
  id: string
  firstname: string
  lastname: string
  username: string
  email: string
  address: string | null
  birth: Date | null
  gender?: 'MALE' | 'FEMALE'
  isVerified: boolean
  phoneNumber: number | null
  point: number
  referral: string
}

export { type UserType }
