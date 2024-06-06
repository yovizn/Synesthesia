import type { Request } from "express";
import { prisma } from "../../libs/prisma";
import { Prisma } from "@prisma/client";
import type { Event } from "@prisma/client";
import { nanoid } from "nanoid";

class EventServices {
  async getEvent(req: Request) {
    const { pageStr, pageSizeStr } = req.params;
    const pageSize = parseInt(pageSizeStr, 10);
    const page = parseInt(pageStr, 10);

    const { location, category } = req.body;
    let filterParams: any = {};
    if (location) filterParams["location"] = location;
    if (category) filterParams["category"] = category;

    filterParams["endAt"] = { gt: new Date() };
    return await prisma.event.findMany({
      include: { tickets: true },
      where: filterParams,
      take: pageSize < 100 ? pageSize : 20,
      skip: page * pageSize || 0,
    });
  }

  async getEventDetail(req: Request) {
    const { eventId } = req.params;
    console.log(eventId, "<><><><><><><><>>");

    return await prisma.event.findFirst({
      where: { id: eventId },
      include: { promotor: true, tickets: true },
    });
  }

  async createEvent(req: Request) {
    const {} = req.params;
    const {
      slug,
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
    } = req.body;

    const isTitleExist = await prisma.event.findFirst({ where: { title } });
    if (isTitleExist) throw new Error("title already exist");

    const eventId = nanoid();
    const data: Prisma.EventCreateInput = {
      id: eventId,
      slug,
      title,
      startAt,
      endAt,
      location,
      description,
      city,
      venueType,
      category,
      use_voucher: useVoucher,
      promotor: { connect: { id: req.user?.Promotor!.id } },
    };

    const ticketRegulerData: Prisma.ticketsCreateInput = {
      id: nanoid(),
      events: { connect: { id: eventId } },
      ticketType: "reguler",
      price: priceReguler,
      capacity: capacityReguler,
    };
    const ticketVipData: Prisma.ticketsCreateInput = {
      id: nanoid(),
      events: { connect: { id: eventId } },
      ticketType: "vip",
      price: priceVip,
      capacity: capacityVip,
    };

    const transaction_ops: any[] = [prisma.event.create({ data })];
    if (capacityReguler && capacityReguler > 0)
      transaction_ops.push(
        prisma.tickets.upsert({
          create: ticketRegulerData,
          where: {
            eventId_ticketType: { eventId: eventId, ticketType: "reguler" },
          },
          update: {
            price: ticketRegulerData.price,
            capacity: ticketRegulerData.capacity,
          },
        })
      );

    if (capacityVip && capacityVip > 0)
      transaction_ops.push(
        prisma.tickets.upsert({
          create: ticketVipData,
          where: {
            eventId_ticketType: { eventId: eventId, ticketType: "vip" },
          },
          update: {
            price: ticketVipData.price,
            capacity: ticketVipData.capacity,
          },
        })
      );

    await prisma.$transaction(transaction_ops);
    return eventId;
  }

  async editEvent(req: Request) {
    const params = req.params.event;
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
    } = req.body as Event;

    await prisma.$transaction(async (prisma) => {
      const { id } = req.params;
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
      });
    });
  }
}

export default new EventServices();
