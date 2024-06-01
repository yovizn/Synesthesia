type UserType = {
  id: string
  imageId: string | null
  firstname: string
  lastname: string
  username: string
  email: string
  birth: Date | null
  gender: 'MALE' | 'FEMALE'
  address: string | null
  referral: string
  referrance: string | null
  point: number
  phoneNumber: string | null
  expPoint: Date | null
}

export { type UserType }
