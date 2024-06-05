type UserType = {
  id: string
  imageId: string | undefined // FE: imageId | BE: avatar (referance by Images.id)
  firstname: string
  lastname: string
  username: string
  email: string
  birth: Date | undefined
  gender: 'MALE' | 'FEMALE' | undefined
  address: string | undefined
  referral: string
  referrance: string | undefined
  point: number
  phoneNumber: string | undefined
  expPoint: Date | undefined
  image:
    | {
        name: string
      }
    | null
  Promotor: {
    id: string
    promotorName: string
    promotorDescription: string | null
    promotorImage: { name: string | null } | null
    balance: number
  } | null
}

export { type UserType }
