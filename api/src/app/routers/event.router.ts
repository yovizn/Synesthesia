import { Router } from 'express'

class EventRouter {
    private router
    constructor() {
        this.router = Router()
    }

    private initializedRoutes() {}

    public getRouter() {
        return this.router
    }
}

export default new EventRouter()
