import type { NextFunction, Request, Response } from 'express'
import promotorService from '../services/promotor.service'

class PromotorController {
    async getPromotor(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await promotorService.getPromotor(req)
            res.send({
                ...data,
            })
        } catch (error) {
            next(error)
        }
    }
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const access_token = await promotorService.register(req)
            res.send({
                title: 'Welcome to Our Promoter Community!',
                description:
                    'We are excited to welcome you to our vibrant and enthusiastic promoter community. As a promoter, you will play a vital role in helping us spread the word about our products and services to a wider audience.',
                access_token
            })
        } catch (error) {
            next(error)
        }
    }
}

export default new PromotorController()
