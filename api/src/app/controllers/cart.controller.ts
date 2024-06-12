import type { NextFunction, Request, Response } from 'express'
import cartService from '../services/cart.service'

class CartController {
    async getCart(req: Request, res: Response, next: NextFunction) {
        try {
            const cart = await cartService.getCart(req)
            res.send(cart)
        } catch (error) {
            next(error)
        }
    }

    async createCart(req: Request, res: Response, next: NextFunction) {
        try {
            await cartService.createCart(req)
            res.send({
                title: 'Successed add to cart',
                description: '',
            })
        } catch (error) {
            next(error)
        }
    }

    async updateCartQuantity(req: Request, res: Response, next: NextFunction) {
        try {
            await cartService.createCart(req)
            res.send({
                message: 'success',
            })
        } catch (error) {
            next(error)
        }
    }

    async deletCart(req: Request, res: Response, next: NextFunction) {
        try {
            await cartService.deleteCart(req)
            res.send({
                title: 'success delete cart',
            })
        } catch (error) {
            next(error)
        }
    }
}

export default new CartController()
