import { Router } from "express";
import userAuth from "../middlewares/user.auth";
import promotorController from "../controllers/promotor.controller";
import { blobUploader } from "../../libs/multer";

class PromotorRouter {
  private router;
  constructor() {
    this.router = Router();
    this.initializedRoutes();
  }

  private initializedRoutes() {
    this.router.get("/v1", userAuth.accesToken, promotorController.getPromotor);
    this.router.post(
      "/v1",
      userAuth.accesToken,
      blobUploader().single("avatar"),
      promotorController.register
    );
  }

  public getRouter() {
    return this.router;
  }
}

export default new PromotorRouter();
