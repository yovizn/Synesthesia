import { Router } from 'express'
import eventController from '../controllers/event.controller'

class EventRouter {
    private router
    constructor() {
        this.router = Router()
        this.initializedRoutes()
    }

    private initializedRoutes() {
        this.router.get('/v1/:promotor', eventController.getEvent)
    }

    public getRouter() {
        return this.router
    }
}

export default new EventRouter()
