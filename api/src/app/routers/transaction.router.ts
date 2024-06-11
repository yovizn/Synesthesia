import { Router } from "express";
import userAuth from "../middlewares/user.auth";
import TransactionController from "../controllers/transaction.controller";
import transactionController from "../controllers/transaction.controller";

class TransactionRouter {
  private router;
  constructor() {
    this.router = Router();
    this.initializedRoutes();
  }

  private initializedRoutes() {
    this.router.post('/system/:ticketId', userAuth.accesToken, transactionController.createTransaction)
    this.router.post(
      "/v1/:transactionId",
      userAuth.accesToken,
      TransactionController.updateTransactionStatus
    );
  }

  public getRouter() {
    return this.router;
  }
}

export default new TransactionRouter();
