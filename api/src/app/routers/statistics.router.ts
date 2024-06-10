import { Router } from "express";
import userAuth from "../middlewares/user.auth";
import StatsticsController from "../controllers/statistics.controller";

class StatisticsRouter {
  private router;
  constructor() {
    this.router = Router();
    this.initializedRoutes();
  }

  private initializedRoutes() {
    this.router.get(
      "/statistics/:promotorId/summary",
      userAuth.accesToken,
      StatsticsController.getAllEventsSummary
    );
  }

  public getRouter() {
    return this.router;
  }
}

export default new StatisticsRouter();
