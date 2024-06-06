import type { Request } from "express";
import { prisma } from "../../libs/prisma";
import type { Prisma } from "@prisma/client";
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
      where: filterParams,
      take: pageSize < 100 ? pageSize : 20,
      skip: page * pageSize || 0,
    });
  }

  async getEventDetail(req: Request) {
    const { eventId } = req.body;

    return await prisma.event.findFirst({
      where: { id: eventId },
      include: { promotor: true },
    });
  }

  async createEvent(req: Request) {
    const {} = req.params;
    const {
      slug,
      title,
      price,
      priceVip,
      startAt,
      endAt,
      location,
      description,
      city,
      venueType,
      category,
    } = req.body;

    const data: Prisma.EventCreateInput = {
      id: nanoid(),
      slug,
      title,
      price,
      priceVip,
      startAt,
      endAt,
      location,
      description,
      city,
      venueType,
      category,
      promotor: { connect: { id: req.user?.Promotor!.id } },
    };
    console.log(data);
    await prisma.event.create({ data });
  }
}

export default new EventServices();
