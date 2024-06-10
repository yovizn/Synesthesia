import type { Request } from "express";
import { prisma } from "../../libs/prisma";

class TransactionService {
  async updateTransactionStatus(
    req: Request,
    userId: string,
    transactionId: string
  ) {
    const { status } = req.body;

    await prisma.transaction.update({
      data: { status },
      where: { userId, id: transactionId },
    });
  }
}

export default new TransactionService();
