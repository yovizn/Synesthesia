import type { Request } from 'express'
import { prisma } from '../../libs/prisma'
import type { Prisma } from '@prisma/client'
import { nanoid } from '../../utils/generate'
import sharp from 'sharp'

class PromotorService {
    async register(req: Request) {
        const { file } = req
        const { promotorName } = req.body

        await prisma.$transaction(async () => {
            const data: Prisma.PromotorCreateManyInput = {
                id: nanoid(),
                promotorName,
                userId: req.user?.id!,
            }

            if (file) {
                const avatar = await sharp(file.buffer).png().toBuffer()
                data.avatar = avatar
            }

            await prisma.promotor.create({
                data,
            })
        })
    }
}

export default new PromotorService()
