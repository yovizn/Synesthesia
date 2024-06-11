import type { NextFunction, Request, Response } from "express";
import StatisticsService from "../services/statistics.service";
import userAuth from "../middlewares/user.auth";

class StatisticsController {
  async getAllEventsSummary(req: Request, res: Response, next: NextFunction) {
    if (!userAuth.isPromotor(req.user))
      res.status(403).render("no access privilege");
    try {
      const data = await StatisticsService.getAllEventsSummary(
        req,
        req.user?.Promotor?.id!
      );
      res.send(data);
    } catch (error) {
      next(error);
    }
  }
}

export default new StatisticsController();
