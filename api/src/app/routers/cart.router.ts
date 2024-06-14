import { Router } from 'express'
import cartController from '../controllers/cart.controller'
import userAuth from '../middlewares/user.auth'

class CartRouter {
    private router: Router
    constructor() {
        this.router = Router()
        this.initializedRoutes()
    }

    private initializedRoutes() {
        this.router.get('/:eventId', userAuth.accesToken, cartController.getCartDetail)
        this.router.post('/shinks', userAuth.accesToken, cartController.deletCart)
        this.router.get('/', userAuth.accesToken, cartController.getCart)
        this.router.post('/', userAuth.accesToken, cartController.createCart)
        this.router.patch(
            '/',
            userAuth.accesToken,
            cartController.updateCartQuantity
        )
    }

    public getRouter() {
        return this.router
    }
}

export default new CartRouter()
