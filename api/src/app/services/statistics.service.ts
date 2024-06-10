import type { Request } from "express";
import { prisma } from "../../libs/prisma";

class StatisticsService {
  async getAllEventsSummary(req: Request, promotorId: string) {
    const data = await prisma.event.findMany({
      include: { Transaction: { include: { TransactionItem: true } } },
      where: { promotorId },
    });

    const statistics: any[] = [];
    data.forEach((node) => {
      // statistic for each event:
      //  1. count by status of transactions
      //  2. total income
      //  3. total discounts applied
      //  4. potential of pending | unpaid invoice
      //  5. total attendees confirmed to come

      const eventId = node.id;
      const description = node.description;
      const location = node.location;
      const category = node.category;
      const city = node.city;
      const title = node.title;
      const venueType = node.venueType;
      const startAt = node.startAt;
      const endAt = node.endAt;

      const statistic: any = {
        eventId,
        description,
        location,
        category,
        city,
        title,
        venueType,
        startAt,
        endAt,
        statuses: {},
        total_income: 0,
        total_discount: 0,
        potential_income: 0,
        total_attendees: 0,
      };
      node.Transaction.forEach((transaction) => {
        statistic["statuses"][transaction.status] =
          (statistic["statuses"][transaction.status] || 0) + 1;

        if (transaction.status === "SUCCESS") {
          statistic["total_income"] +=
            transaction.total - transaction.discountPoint;

          statistic["total_discount"] = transaction.discountPoint;
          transaction.TransactionItem.forEach((item) => {
            statistic["total_attendees"] += item.quantity;
          });
        } else {
          statistic["potential_income"] =
            transaction.total - transaction.discountPoint;
        }
      });
      statistics.push(statistic);
    });
    return statistics;
  }
}

export default new StatisticsService();
