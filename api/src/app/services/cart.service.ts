import type { Request } from 'express'
import { prisma } from '../../libs/prisma'

class CartService {
    async createCart(req: Request) {
        const { ticketsId, eventId, quantity } = req.body
        const userId = req.user?.id

        if (Number(quantity) === 0) throw new Error('Quantity cannot be 0')

        const findCart = await prisma.carts.findFirst({
            where: {
                userId,
                ticketsId,
                eventId,
            },
        })

        if (findCart) throw new Error('Product is already on cart')

        return await prisma.carts.create({
            data: {
                userId: userId!,
                ticketsId,
                eventId,
                quantity,
            },
        })
    }

    async updateCartQuantity(req: Request) {
        const { ticketsId, eventId, quantity } = req.body
        const userId = req.user?.id!

        return await prisma.carts.update({
            data: { quantity },
            where: {
                userId_ticketsId_eventId: {
                    userId,
                    ticketsId,
                    eventId,
                },
            },
        })
    }

    async deleteCart(req: Request) {
        const { ticketsId, eventId } = req.body
        const userId = req.user?.id!

        return await prisma.carts.delete({
            where: {
                userId_ticketsId_eventId: {
                    userId,
                    ticketsId,
                    eventId,
                },
            },
        })
    }

    async getCart(req: Request) {
        return await prisma.carts.findMany({
            where: { userId: req.user?.id },
            select: {
                events: {
                    select: {
                        id: true,
                        title: true,
                        poster: { select: { name: true } },
                    },
                },
                tickets: {
                    select: {
                        id: true,
                        price: true,
                        capacity: true,
                        type: true,
                    },
                },
            },
        })
    }
}

export default new CartService()
