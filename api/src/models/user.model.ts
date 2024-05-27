import type { Gender } from '@prisma/client'

export type UserType = {
    id: string
    firstname: string
    lastname: string
    username: string
    email: string
    password?: string
    birth?: Date | null
    gender?: Gender
    address?: string | null
    referral?: string
    referrance?: string | null
    point?: number
    phoneNumber?: string | null
    isVerified?: boolean
    isDelete?: boolean
    createdAt?: Date
    updatedAt?: Date
} | null
