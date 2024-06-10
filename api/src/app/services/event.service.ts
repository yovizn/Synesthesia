import type { Request } from 'express'
import { prisma } from '../../libs/prisma'
import { Prisma } from '@prisma/client'
import type { Event } from '@prisma/client'
import { nanoid } from 'nanoid'
import sharp from 'sharp'
import { toSlug } from '../../utils/toSlug'

class EventServices {
    async getEvent(req: Request) {
        // const { pageStr, pageSizeStr } = req.params
        // const pageSize = parseInt(pageSizeStr, 10)
        // const page = parseInt(pageStr, 10)

        // const { location, category } = req.body
        // let filterParams: any = {}
        // if (location) filterParams['location'] = location
        // if (category) filterParams['category'] = category

        // filterParams['endAt'] = { gt: new Date() }
        // return await prisma.event.findMany({
        //     include: { Tickets: true },
        //     where: filterParams,
        //     take: pageSize < 100 ? pageSize : 20,
        //     skip: page * pageSize || 0,
        // })
        return await prisma.event.findMany({
            take: 10,
            skip: 0,
            include: {
                poster: { select: { name: true } },
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
        const { eventId } = req.params
        console.log(eventId, '<><><><><><><><>>')

        return await prisma.event.findFirst({
            where: { id: eventId },
            include: { promotor: true, Tickets: true },
        })
    }

    async createEvent(req: Request) {
        // const {} = req.params
        const {
            // slug,
            title,
            startAt,
            endAt,
            location,
            description,
            city,
            venueType,
            category,
            useVoucher,
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
                useVoucher: useVoucher === 'true' ? true : false,
                promotor: { connect: { id: req.user?.Promotor?.id } },
            }

            const event = await prisma.event.create({
                data,
            })

            if (file) {
                const blob = await sharp(file.buffer).webp().toBuffer()
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

            if (priceVip && capacityVip) {
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

        // return createEvent.id

        // const eventCreate = await prisma.$transaction(async (prisma) => {
        //     const generateSlug = `${toSlug(title.trim())}-${nanoid(10)}`
        //     const eventId = nanoid()
        //     const imageId = nanoid()
        //     const isTitleExist = await prisma.event.findFirst({
        //         where: { title },
        //         select: { title: true },
        //     })
        //     if (isTitleExist?.title) throw new Error('Title already exist')
        //     const data: Prisma.EventCreateInput = {
        //         id: eventId,
        //         slug: generateSlug,
        //         title,
        //         startAt,
        //         endAt,
        //         location,
        //         description,
        //         city,
        //         venueType,
        //         category,
        //         use_voucher: useVoucher === 'true' ? true : false,
        //         promotor: { connect: { id: req.user?.Promotor?.id } },
        //         // eventImage: { connect: { id: imageId } },
        //     }

        //     const event = await prisma.event.create({
        //         data,
        //     })

        //     if (file) {
        //         const blob = await sharp(file.buffer).webp().toBuffer()
        //         const slug = `${toSlug(file.fieldname)}-${nanoid(10)}`
        //         const name = `promotor_poster/${slug}`
        //         const image: Prisma.ImageCreateInput = {
        //             id: imageId,
        //             blob,
        //             name,
        //         }
        //         await prisma.image.create({
        //             data: image,
        //         })
        //     }

        //     const dataTicketsReguler: Prisma.ticketsCreateInput = {
        //         id: nanoid(),
        //         capacity: capacityReguler,
        //         events: { connect: { id: eventCreate.id } },
        //         price: !priceReguler ? 0 : priceReguler,
        //         ticketType: 'reguler',
        //     }
        //     if (priceVip && capacityVip) {
        //         const dataTicketsVip: Prisma.ticketsCreateInput = {
        //             id: nanoid(),
        //             capacity: capacityVip,
        //             events: { connect: { id: eventCreate.id } },
        //             price: !priceVip ? 0 : priceVip,
        //             ticketType: 'vip',
        //         }

        //         await prisma.tickets.create({
        //             data: dataTicketsVip,
        //         })
        //     }
        //     await prisma.tickets.create({
        //         data: dataTicketsReguler,
        //     })
        //     return { id: event.id }
        // })

        // await prisma.$transaction(async (prisma) => {

        // })

        // return eventCreate.id

        // const isTitleExist = await prisma.event.findFirst({ where: { title } })
        // if (isTitleExist) throw new Error('title already exist')

        // const generateSlug = `${toSlug(title.trim())}-${nanoid(10)}`

        // const eventId = nanoid()
        // const imageId = nanoid()
        // const data: Prisma.EventCreateInput = {
        //     id: eventId,
        //     slug: generateSlug,
        //     title,
        //     startAt,
        //     endAt,
        //     city,
        //     location,
        //     description,
        //     venueType,
        //     category,
        //     eventImage: { connect: { id: imageId } },
        //     use_voucher: useVoucher,
        //     promotor: { connect: { id: req.user?.Promotor!.id } },
        // }
        // if (file) {
        //     const blob = await sharp(file.buffer).webp().toBuffer()
        //     const slug = `${toSlug(file.fieldname)}-${nanoid(10)}`
        //     const name = `promotor_poster/${slug}`

        //     const image: Prisma.ImageCreateInput = {
        //         id: imageId,
        //         blob,
        //         name,
        //     }
        //     await prisma.image.create({
        //         data: image,
        //     })
        // }
        // const ticketRegulerData: Prisma.ticketsCreateInput = {
        //     id: nanoid(),
        //     events: { connect: { id: eventId } },
        //     ticketType: 'reguler',
        //     price: priceReguler,
        //     capacity: capacityReguler,
        // }
        // const ticketVipData: Prisma.ticketsCreateInput = {
        //     id: nanoid(),
        //     events: { connect: { id: eventId } },
        //     ticketType: 'vip',
        //     price: priceVip,
        //     capacity: capacityVip,
        // }

        // const transaction_ops: any[] = [prisma.event.create({ data })]
        // if (capacityReguler && capacityReguler > 0)
        //     transaction_ops.push(
        //         prisma.tickets.upsert({
        //             create: ticketRegulerData,
        //             where: {
        //                 eventId_ticketType: {
        //                     eventId: eventId,
        //                     ticketType: 'reguler',
        //                 },
        //             },
        //             update: {
        //                 price: ticketRegulerData.price,
        //                 capacity: ticketRegulerData.capacity,
        //             },
        //         })
        //     )

        // if (capacityVip && capacityVip > 0)
        //     transaction_ops.push(
        //         prisma.tickets.upsert({
        //             create: ticketVipData,
        //             where: {
        //                 eventId_ticketType: {
        //                     eventId: eventId,
        //                     ticketType: 'vip',
        //                 },
        //             },
        //             update: {
        //                 price: ticketVipData.price,
        //                 capacity: ticketVipData.capacity,
        //             },
        //         })
        //     )

        // await prisma.$transaction(transaction_ops)

        // return eventId
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
