import { Router } from 'express'
import imageController from '../controllers/image.controller'
class ImageRouter {
    private router
    constructor() {
        this.router = Router()
        this.initializedRoutes()
    }

    private initializedRoutes() {
      this.router.get('/webp/:name', imageController.renderWebp)
    }

    public getRouter() {
        return this.router
    }
}

export default new ImageRouter()
