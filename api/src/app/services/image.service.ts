import type { Request } from 'express'
import { prisma } from '../../libs/prisma'

class ImageService {
    async renderWebp(req: Request) {
        const { name } = req.params
        const image = await prisma.image.findFirst({
            where: { name },
            select: { blob: true },
        })

        return image?.blob
    }
    async renderPng(req: Request) {
        const { name } = req.params
        const image = await prisma.image.findFirst({
            where: { name },
            select: { blob: true },
        })

        return image?.blob
    }
}

export default new ImageService()
