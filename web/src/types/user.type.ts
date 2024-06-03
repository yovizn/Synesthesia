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
    | undefined
}

export { type UserType }
