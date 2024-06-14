import type { Request } from 'express'
import { prisma } from '../../libs/prisma'
import { Prisma } from '@prisma/client'
import { generateInvoice, nanoid } from '../../utils/generate'

type TTransactionItems = {
    id: string
    price: Prisma.Decimal
    quantity: number
}

class TransactionService {
    async getTrasaction(req: Request) {
        return await prisma.transaction.findMany({
            where: { userId: req.user?.id },
            include: {
                event: {
                    select: { title: true, poster: { select: { name: true } } },
                },
            },
        })
    }

    async updateTransactionStatus(req: Request) {
        const { status } = req.body
        const { id } = req.params

        return await prisma.$transaction(async (tx) => {
            await tx.transaction.update({
                data: { status: status === "PAID" ? 'SUCCESS' : 'UNPAID' },
                where: { userId: req.user?.id, id },
            })
        })
    }

    async createTransaction(req: Request) {
        const { usePoint, use_voucher, eventId } = req.body
        const ticketsItem: TTransactionItems[] = req.body.ticketsItem

        console.log(req.body)

        if (usePoint && Number(req.user?.point) < 0)
            throw new Error('Cannot use point balance is not enough')

        return await prisma.$transaction(async (tx) => {
            const event = await tx.event.findFirst({
                where: { id: eventId },
                select: { useVoucher: true },
            })
            const voucher = await tx.voucher.findFirst({
                where: { userId: req.user?.id },
                select: { isValid: true },
            })

            console.log(voucher)

            if (use_voucher && !voucher?.isValid)
                throw new Error('You cannot use voucher')

            const invoiceNumber = generateInvoice(eventId)
            const discountPoint = Number(req.user?.point)
            const dataItems: Prisma.TransactionItemCreateManyInput[] = []
            let sumTotal = 0

            const data: Prisma.TransactionCreateInput = {
                id: nanoid(),
                event: { connect: { id: eventId } },
                user: { connect: { id: req.user?.id } },
                invoiceNumber,
                total: 0,
                discountPoint: usePoint == 'true' ? discountPoint : 0,
            }

            const transaction = await tx.transaction.create({
                data,
            })

            for (let i = 0; i < ticketsItem.length; i++) {
                const ticket = await tx.tickets.findFirst({
                    where: { id: ticketsItem[i].id },
                    include: { event: { select: { useVoucher: true } } },
                })

                if (!ticket) throw new Error('Cannot find ticket')

                ticketsItem[i].price = ticket.price

                sumTotal =
                    sumTotal +
                    Number(ticketsItem[i].price) *
                        ticketsItem[i].quantity *
                        (Boolean(use_voucher) && ticket.event.useVoucher
                            ? 0.9
                            : 1)

                dataItems.push({
                    transactionId: transaction.id,
                    ticketsId: ticket.id,
                    price: ticket.price,
                    quantity: ticketsItem[i].quantity,
                })
            }
            const total = new Prisma.Decimal(sumTotal).mul(
                event?.useVoucher ? 0.9 : 1
            )

            await tx.transactionItem.createMany({
                data: dataItems,
            })

            await tx.transaction.update({
                data: {
                    total,
                },
                where: {
                    id: transaction.id,
                },
            })

            await tx.cart.deleteMany({
                where: {
                    userId: req.user?.id,
                },
            })
        })
    }
}

export default new TransactionService()
