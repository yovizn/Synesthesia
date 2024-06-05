import type { Request } from 'express'
import { prisma } from '../../libs/prisma'

class EventServices {
    async getEvent(req: Request) {
        const { promotor } = req.params
        const promotorId = promotor
        const data = await prisma.event.findFirst({
            where: { promotorId },
        })
    }

    async createEvent(req: Request) {
      const {} = req.params
      const {} = req.body
    }
}

export default new EventServices()

// import { Request } from "express";

// import { throwError, validator } from "../utils/validator";
// import { Category, Event, Prisma, Venue_type } from "@prisma/client";

// import { TUser } from "../models/user.model";
// import { prisma } from "../libs/prisma";
// import { Order, OrderType, TEvent } from "../models/event.model";

// class EventServices {
//   private customSelect = {
//     title: true,
//     location: true,
//     city: true,
//     venue_type: true,
//     details: true,
//     roster: true,
//     status: true,
//     scheduled_at: true,
//     start_time: true,
//     end_time: true,
//     ticket_price: true,
//     ticket_amount: true,
//     user_id: true,
//     category: true,
//     image_url: true,
//     discount_amount: true,
//   };

//   async getAll(req: Request) {
//     const data: TEvent[] = await prisma.event.findMany();
//     return data;
//   }

//   async getWithOrder(req: Request) {
//     const { orderType, order, filterValue, page, limit } = req.query as {
//       orderType: OrderType;
//       order: Prisma.SortOrder;
//       filterValue: string;
//       page: string;
//       limit: string;
//     };

//     const totalCount = await prisma.event.count({
//       where: {
//         OR: [
//           { city: { equals: filterValue } },
//           { title: { contains: filterValue } },
//           { roster: { contains: filterValue } },
//         ],
//       },
//     });
//     console.log(totalCount);

//     const baseData = (await prisma.event.findMany({
//       orderBy: [{ [orderType]: order }],
//       skip: Number(limit) * (Number(page) - 1),
//       take: Number(limit),
//       where: {
//         OR: [
//           { city: { contains: filterValue } },
//           { title: { contains: filterValue } },
//           { roster: { contains: filterValue } },
//         ],
//       },
//     })) as TEvent[];

//     const data = baseData.map((e) => {
//       let discountCalculation: number = 0;
//       if (e.discount_amount && e.ticket_price) {
//         discountCalculation =
//           e.ticket_price - (e.discount_amount / 100) * e.ticket_price;
//       }
//       return { ...e, discountCalculation };
//     });

//     return { data, totalCount };
//   }

//   async getEventsPromotor(req: Request, customSelect = this.customSelect) {
//     const { id_username } = req.params;

//     const data = await prisma.$transaction(async (prisma: any) => {
//       try {
//         const findUser = (await prisma.user.findFirst({
//           where: {
//             OR: [{ id: id_username }, { username: id_username }],
//             role: "promotor",
//           },
//           select: { id: true },
//         })) as TUser;

//         validator(
//           !findUser || !findUser.id,
//           "User is not found OR the UserID is undefined"
//         );

//         return await prisma.event.findMany({
//           where: { user_id: findUser.id },
//           select: customSelect,
//         });
//       } catch (error) {
//         throwError(error);
//       }
//     });
//     return data;
//   }

//   async getEventsCustomer(req: Request, customSelect = this.customSelect) {}

//   async getById(req: Request) {
//     const { id } = req.params;
//     validator(!id, "event not found");

//     const baseData = (await prisma.event.findFirst({
//       where: { id: id },
//     })) as TEvent;
//     validator(!baseData, "event not found");

//     let discountCalculation: number = 0;
//     if (baseData?.discount_amount && baseData.ticket_price) {
//       discountCalculation =
//         baseData.ticket_price -
//         (baseData.discount_amount / 100) * baseData.ticket_price;
//     }

//     const data = { ...baseData, discountCalculation };

//     return data;
//   }

//   async update(req: Request) {
//     const { username, id } = req.params;
//     // const { id } = req.query as { id: string };

//     const inputEntries = Object.entries(req.body).reduce(
//       (arr: any[], [key, value]) => {
//         if (
//           key !== "id" &&
//           key !== "role" &&
//           key !== "status" &&
//           key !== "user_id" &&
//           key !== "created_at" &&
//           key !== "updated_at"
//         ) {
//           value && arr.push([key, value]);
//         }
//         return arr;
//       },
//       []
//     );
//     const inputs = Object.fromEntries(inputEntries) as Event;

//     const data = await prisma.$transaction(async (prisma: any) => {
//       try {
//         const findUser = (await prisma.user.findFirst({
//           where: { username: username, role: "promotor" },
//           select: { id: true },
//         })) as TUser;
//         // console.log(findUser);

//         validator(
//           !findUser || !findUser.id,
//           "User is not found OR the UserID is undefined"
//         );

//         return await prisma.event.update({
//           where: { id, user_id: findUser.id },
//           data: { ...inputs },
//         });
//       } catch (error) {
//         throwError(error);
//       }
//     });
//     return data;
//   }

//   async create(req: Request) {
//     const { username } = req.params;
//     const {
//       title,
//       location,
//       city,
//       zip_code,
//       venue_type,
//       details,
//       roster,
//       scheduled_at,
//       start_time,
//       end_time,
//       ticket_price,
//       ticket_amount,
//       assigned_pic,
//       pic_phone_no,
//       category,
//       discount_amount,
//       image_url,
//     } = req.body as TEvent;

//     const findUser = (await prisma.user.findFirst({
//       where: { username: username },
//       select: { id: true },
//     })) as { id: string };

//     validator(!findUser, "no user found");

//     const createNewEvent = await prisma.event.create({
//       data: {
//         user_id: findUser.id,
//         title: title,
//         location: location,
//         city: city,
//         zip_code: Number(zip_code),
//         venue_type: Venue_type[venue_type as keyof typeof Venue_type],
//         details: details,
//         roster: roster,
//         scheduled_at: scheduled_at,
//         start_time: start_time,
//         end_time: end_time,
//         ticket_price: Number(ticket_price),
//         ticket_amount: Number(ticket_amount),
//         assigned_pic: `${assigned_pic}`,
//         pic_phone_no: `${pic_phone_no}`,
//         category: Category[category as keyof typeof Category] || undefined,
//         discount_amount: Number(discount_amount),
//         image_url: image_url,
//       },
//     });

//     let discountCalculation: number = 0;
//     if (createNewEvent.discount_amount) {
//       discountCalculation =
//         (createNewEvent.discount_amount / 100) * createNewEvent.ticket_price;
//     }

//     const data = { ...createNewEvent, discountCalculation };

//     return data;
//   }

//   async delete(req: Request) {
//     const { username } = req.params;
//     const { title } = req.body as { title: string };

//     const findUser = (await prisma.user.findFirst({
//       where: { username: username },
//       select: { id: true },
//     })) as { id: string };
//     const findEvent = (await prisma.event.findFirst({
//       where: { user_id: findUser.id, title: { contains: `${title}` } },
//       select: { id: true },
//     })) as { id: string };

//     console.log(findUser);
//     const data = await prisma.event.delete({
//       where: { id: findEvent.id },
//     });
//     return data;
//   }
// }

// export default new EventServices();
