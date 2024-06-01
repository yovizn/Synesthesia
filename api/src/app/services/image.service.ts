import type { Request } from 'express'
import { prisma } from '../../libs/prisma'

class ImageService {
    async renderWebp(req: Request) {
        const { id } = req.params
        const image = await prisma.image.findFirst({
            where: { id },
            select: { blob: true },
        })

        return image?.blob
    }
}

export default new ImageService()
