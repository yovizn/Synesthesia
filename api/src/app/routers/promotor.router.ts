import { Router } from 'express'
import userAuth from '../middlewares/user.auth'
import promotorController from '../controllers/promotor.controller'

class PromotorRouter {
    private router
    constructor() {
        this.router = Router()
        this.initializedRoutes()
    }

    private initializedRoutes() {
        this.router.post(
            '/',
            userAuth.refreshToken,
            promotorController.register
        )
    }

    public getRouter() {
        return this.router
    }
}

export default new PromotorRouter()
