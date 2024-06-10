import type { Request } from 'express'
import { prisma } from '../../libs/prisma'
import type { Prisma } from '@prisma/client'
import { nanoid } from '../../utils/generate'
import sharp from 'sharp'
import { sign } from 'jsonwebtoken'
import { SECRET_KEY_ACCESS } from '../../configs/env'
import { toSlug } from '../../utils/toSlug'

class PromotorService {
    async register(req: Request) {
        const { file } = req
        const { promotorName, promotorDescription } = req.body

        return await prisma.$transaction(async (prisma) => {
            const select: Prisma.UserSelect = {
                id: true,
                imageId: true,
                firstname: true,
                lastname: true,
                username: true,
                email: true,
                birth: true,
                gender: true,
                address: true,
                referral: true,
                referrance: true,
                point: true,
                phoneNumber: true,
                expPoint: true,
                image: {
                    select: {
                        name: true,
                    },
                },
                Promotor: {
                    select: {
                        id: true,
                        promotorName: true,
                        promotorDescription: true,
                        promotorImage: { select: { name: true } },
                        balance: true,
                    },
                },
            }
            const data: Prisma.PromotorCreateInput = {
                id: nanoid(),
                promotorName,
                promotorDescription,
                user: { connect: { id: req.user?.id } },
            }
            const findPromotor = await prisma.promotor.findFirst({
                where: { promotorName },
                select: { promotorName: true },
            })

            if (findPromotor?.promotorName)
                throw new Error('Sorry your promotor name already exist', {
                    cause: "it's not you, it is just another promotor already used your signature.",
                })

            await prisma.promotor.create({
                data,
            })

            if (file) {
                const blob = await sharp(file.buffer).webp().toBuffer()
                const slug = `${toSlug(file.fieldname)}-${nanoid(10)}`
                const name = `promotor_avatar-${slug}`
                const image: Prisma.ImageCreateInput = {
                    id: nanoid(),
                    blob,
                    name,
                }
                await prisma.image.create({
                    data: image,
                })
                await prisma.promotor.update({
                    data: { promotorImageId: image.id },
                    where: { id: data.id },
                })
            }

            const token = await prisma.user.findFirst({
                where: { id: req.user?.id },
                select,
            })

            if (token?.id)
                return sign(token, SECRET_KEY_ACCESS, { expiresIn: '15m' })
        })
    }

    async getPromotor(req: Request) {
        const select: Prisma.PromotorSelect = {
            id: true,
            promotorName: true,
            promotorDescription: true,
            balance: true,
            promotorImage: { select: { name: true } },
            Event: { select: { id: true } },
        }

        return await prisma.promotor.findFirst({
            where: { id: req.user?.Promotor?.id },
            select,
        })
    }
}

export default new PromotorService()
