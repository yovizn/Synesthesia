import type { $Enums, User } from "@prisma/client"

export type UserType = {
    id: string
    imageId: string | null
    firstname: string
    lastname: string
    username: string
    email: string
    password?: string
    birth: Date | null
    gender: $Enums.Gender
    address: string | null
    referral: string
    referrance: string | null
    point: number
    phoneNumber: string | null
    expPoint: Date | null
    isVerified?: boolean
    isDelete?: boolean
    createdAt?: Date
    updatedAt?: Date
} | null

type u = User