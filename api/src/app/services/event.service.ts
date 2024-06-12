import type { Request } from 'express'
import { prisma } from '../../libs/prisma'
import { Prisma } from '@prisma/client'
import type { Event } from '@prisma/client'
import { nanoid } from 'nanoid'
import sharp from 'sharp'
import { toSlug } from '../../utils/toSlug'

class EventServices {
    async getEventCategory(req: Request) {
        const category: string = req.params.category

        return await prisma.event.findMany({
            where: { category: category.toUpperCase() },
            include: {
                poster: { select: { name: true } },
                promotor: {
                    select: {
                        promotorName: true,
                        promotorImage: { select: { name: true } },
                    },
                },
                Tickets: {
                    select: {
                        price: true,
                        type: true,
                        id: true,
                        capacity: true,
                    },
                },
            },
        })
    }
    async getNewRelease(req: Request) {
        return await prisma.event.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        })
    }

    async getEvent(req: Request) {
        return await prisma.event.findMany({
            include: {
                poster: { select: { name: true } },
                promotor: {
                    select: {
                        promotorName: true,
                        promotorImage: { select: { name: true } },
                    },
                },
                Tickets: {
                    select: {
                        price: true,
                        type: true,
                        id: true,
                        capacity: true,
                    },
                },
            },
        })
    }

    async getEventDetail(req: Request) {
        const { slug } = req.params

        return await prisma.event.findFirst({
            where: { slug },
            include: {
                Tickets: true,
                promotor: {
                    select: {
                        promotorName: true,
                        promotorImage: { select: { name: true } },
                        promotorDescription: true,
                    },
                },
                poster: { select: { name: true } },
            },
        })
    }

    async createEvent(req: Request) {
        const {
            title,
            startAt,
            endAt,
            location,
            description,
            city,
            venueType,
            category,
            use_voucher,
            priceReguler,
            capacityReguler,
            capacityVip,
            priceVip,
        } = req.body

        const { file } = req
        const findTitle = await prisma.event.findFirst({
            where: { title },
            select: { title: true },
        })

        if (findTitle?.title)
            throw new Error('Title is used, try another title')

        if (Number(capacityVip) && Number(priceVip) < 1000)
            throw new Error('VIP cannot less then 1000')

        if (priceVip && Number(capacityVip) < 0)
            throw new Error('At least capacity need more than 0')

        return await prisma.$transaction(async (prisma) => {
            const generateSlug = `${toSlug(title.trim())}-${nanoid(10)}`
            const data: Prisma.EventCreateInput = {
                id: nanoid(),
                slug: generateSlug,
                title,
                startAt,
                endAt,
                location,
                description,
                city,
                venueType,
                category,
                useVoucher: use_voucher ? true : false,
                promotor: { connect: { id: req.user?.Promotor?.id } },
            }

            const event = await prisma.event.create({
                data,
            })

            if (file) {
                const blob = await sharp(file.buffer).png().toBuffer()
                const slug = `${toSlug(file.fieldname)}-${nanoid(10)}`
                const name = `event_poster-${slug}`
                const image: Prisma.ImageCreateInput = {
                    id: nanoid(),
                    blob,
                    name,
                    Event: { connect: { id: event.id } },
                }
                await prisma.image.create({
                    data: image,
                })
            }

            const dataTicket: Prisma.TicketsCreateInput = {
                id: nanoid(),
                type: 'REGULER',
                capacity: Number(capacityReguler),
                price: Number(priceReguler),
                event: { connect: { id: event.id } },
            }

            await prisma.tickets.create({
                data: dataTicket,
            })

            if (priceVip && capacityVip && Number(priceVip) > 1000) {
                const dataTicket: Prisma.TicketsCreateInput = {
                    id: nanoid(),
                    type: 'VIP',
                    capacity: Number(capacityVip),
                    price: Number(priceVip),
                    event: { connect: { id: event.id } },
                }

                await prisma.tickets.create({
                    data: dataTicket,
                })
            }

            return { title: event.title }
        })
    }

    async editEvent(req: Request) {
        const params = req.params.event
        const {
            slug,
            title,
            startAt,
            endAt,
            city,
            location,
            description,
            category,
            venueType,
        } = req.body as Event

        await prisma.$transaction(async (prisma) => {
            const { id } = req.params
            await prisma.event.update({
                where: { id },
                data: {
                    slug,
                    title,
                    startAt,
                    endAt,
                    city,
                    location,
                    description,
                    category,
                    venueType,
                },
            })
        })
    }
}

export default new EventServices()
