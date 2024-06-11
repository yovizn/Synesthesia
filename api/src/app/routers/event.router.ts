import { Router } from 'express'
import userAuth from '../middlewares/user.auth'
import eventController from '../controllers/event.controller'
import { blobUploader } from '../../libs/multer'

class EventRouter {
    private router
    constructor() {
        this.router = Router()
        this.initializedRoutes()
    }

    private initializedRoutes() {
        this.router.get(
            '/v1',
            eventController.getEvent
        )
        this.router.post(
            '/v1',
            userAuth.accesToken,
            blobUploader().single('avatar'),
            eventController.createEvent
        )
        this.router.patch(
            '/v1/:id',
            userAuth.accesToken,
            eventController.editEvent
        )
        this.router.get(
            '/v1/:slug',
            eventController.getEventDetail
        )
    }

    public getRouter() {
        return this.router
    }
}

export default new EventRouter()
