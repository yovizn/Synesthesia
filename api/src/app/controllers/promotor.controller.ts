import type { NextFunction, Request, Response } from 'express'
import promotorService from '../services/promotor.service'

class PromotorController {
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            await promotorService.register(req)
            res.send({})
        } catch (error) {
            next(error)
        }
    }
}

export default new PromotorController()
