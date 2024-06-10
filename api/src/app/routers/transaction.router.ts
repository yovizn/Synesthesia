import { Router } from "express";
import userAuth from "../middlewares/user.auth";
import TransactionController from "../controllers/transaction.controller";

class TransactionRouter {
  private router;
  constructor() {
    this.router = Router();
    this.initializedRoutes();
  }

  private initializedRoutes() {
    this.router.post(
      "/transactions/:transactionId",
      userAuth.accesToken,
      TransactionController.updateTransactionStatus
    );
  }

  public getRouter() {
    return this.router;
  }
}

export default new TransactionRouter();
