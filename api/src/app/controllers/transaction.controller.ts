import type { NextFunction, Request, Response } from "express";
import TransactionService from "../services/transaction.service";

class TransactionController {
  async updateTransactionStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const transactionId = req.params.transactionId;
      const userId = req.user?.id!;
      const data = await TransactionService.updateTransactionStatus(
        req,
        userId,
        transactionId
      );
      res.send(data);
    } catch (error) {
      next(error);
    }
  }
}

export default new TransactionController();
