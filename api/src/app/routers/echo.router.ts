import { Router } from 'express'
import echoController from '../controllers/echo.controller'
import userAuth from '../../middlewares/user.auth'

class EchosRouter {
    private router: Router
    constructor() {
        this.router = Router()
        this.initializedRoutes()
    }

    private initializedRoutes() {
        this.router.get("/v3", userAuth.refreshToken,  echoController.keepLogin)
        this.router.get('/:token', echoController.validation)
        this.router.post('/v1', echoController.register)
        this.router.post('/v2', echoController.login)
    }

    public getRouter() {
        return this.router
    }
}

export default new EchosRouter()
