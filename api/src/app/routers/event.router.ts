import { Router } from "express";
import userAuth from "../middlewares/user.auth";
import eventController from "../controllers/event.controller";

class EventRouter {
  private router;
  constructor() {
    this.router = Router();
    this.initializedRoutes();
  }

  private initializedRoutes() {
    this.router.get("/v1", userAuth.accesToken, eventController.getEvent);
    this.router.post("/v1", userAuth.accesToken, eventController.createEvent);
    this.router.get(
      "/v1/:eventID",
      userAuth.accesToken,
      eventController.getEventDetail
    );
  }

  public getRouter() {
    return this.router;
  }
}

export default new EventRouter();
