import type { Request } from 'express'
import { prisma } from '../../libs/prisma'

class CartService {
    async createCart(req: Request) {
        const { ticketsId, eventId, quantity } = req.body
        const userId = req.user?.id!

        return prisma.$transaction(async (tx) => {
            if (Number(quantity) === 0) throw new Error('Quantity cannot be 0')

            const findCart = await tx.cart.findFirst({
                where: {
                    userId,
                    ticketsId,
                    eventId,
                },
            })

            if (findCart)
                return await tx.cart.update({
                    where: {
                        userId_ticketsId_eventId: {
                            userId,
                            ticketsId,
                            eventId,
                        },
                    },
                    data: {
                        quantity: findCart.quantity + 1,
                    },
                })

            return await tx.cart.create({
                data: {
                    userId: userId!,
                    ticketsId,
                    eventId,
                    quantity: Number(quantity) === 0 ? 1 : quantity,
                },
            })
        })
    }

    async updateCartQuantity(req: Request) {
        const { ticketsId, eventId, quantity } = req.body
        const userId = req.user?.id!

        return await prisma.cart.update({
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

        console.log(req.body)

        return await prisma.cart.delete({
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
        // return await prisma.cart.findMany({
        //     where: { userId: req.user?.id },
        //     select: {
        //         quantity: true,
        //         events: {
        //             select: {
        //                 id: true,
        //                 title: true,
        //                 useVoucher: true,
        //                 venueType: true,
        //                 slug: true,
        //                 category: true,
        //                 poster: { select: { name: true } },
        //                 promotor: { select: { promotorName: true } },
        //             },
        //         },
        //         tickets: {
        //             select: {
        //                 id: true,
        //                 price: true,
        //                 capacity: true,
        //                 type: true,
        //             },
        //         },
        //     },
        //     orderBy: {
        //         updatedAt: 'desc',
        //     },
        // })

        return await prisma.tickets.findMany()
    }
    async getCartDetail(req: Request) {
        const { eventId } = req.params
        return await prisma.cart.findMany({
            where: { eventId },
            select: {
                quantity: true,
                events: {
                    select: {
                        id: true,
                        title: true,
                        useVoucher: true,
                        venueType: true,
                        slug: true,
                        category: true,
                        poster: { select: { name: true } },
                        promotor: { select: { promotorName: true } },
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
