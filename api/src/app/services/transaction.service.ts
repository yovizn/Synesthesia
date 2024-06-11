import type { Request } from 'express'
import { prisma } from '../../libs/prisma'
import { Prisma } from '@prisma/client'
import { nanoid } from 'nanoid'
import { generateInvoice } from '../../utils/generate'

class TransactionService {
    async updateTransactionStatus(
        req: Request,
        userId: string,
        transactionId: string
    ) {
        const { status } = req.body

        await prisma.transaction.update({
            data: { status },
            where: { userId, id: transactionId },
        })
    }

    async createTransaction(req: Request) {
        const { ticketId } = req.params
        const { totalItems, usePoint, useVoucher } = req.body
        const findTicket = await prisma.tickets.findFirst({
            where: { id: ticketId },
            include: { event: true },
        })

        if (!findTicket?.id) throw new Error('Cannot find this event')
        if (totalItems < 1) throw new Error('Invalid Total Items')
        if (usePoint && !req.user?.point)
            throw new Error('Cannot use point balance is not enough')

        return await prisma.$transaction(async (tx) => {
            const voucher = await tx.voucher.findFirst({
                where: { userId: req.user?.id },
            })
            const invoiceNumber = generateInvoice(findTicket.event.id)
            const discountPoint = Number(req.user?.point)
            const totalSum = new Prisma.Decimal(findTicket.price)
                .minus(discountPoint)
                .mul(Number(totalItems))

            const total =
                useVoucher == 'true'
                    ? totalSum.mul(new Prisma.Decimal(0.9))
                    : totalSum

            const data: Prisma.TransactionCreateInput = {
                id: nanoid(),
                invoiceNumber,
                event: { connect: { id: findTicket.event.id } },
                user: { connect: { id: req.user?.id } },
                total,
                discountPoint: usePoint == 'true' ? discountPoint : 0,
                Voucher:
                    useVoucher == 'true'
                        ? { connect: { id: voucher?.id } }
                        : undefined,
            }

            if (usePoint) {
                await tx.user.update({
                    where: { id: req.user?.id },
                    data: { point: 0 },
                })
            }

            if (useVoucher) {
                if (voucher?.isValid === false)
                    throw new Error('You cannot use voucher')

                await tx.voucher.update({
                    where: { id: voucher?.id },
                    data: { isValid: false },
                })
            }

            const createTransaction = await tx.transaction.create({
                data,
            })

            const dataItem: Prisma.TransactionItemCreateInput = {
                price: findTicket.price,
                ticket: { connect: { id: findTicket.id } },
                transaction: { connect: { id: createTransaction.id } },
                quantity: Number(totalItems),
            }

            await tx.transactionItem.create({
                data: dataItem,
            })

            return createTransaction
        })
    }
}

export default new TransactionService()
