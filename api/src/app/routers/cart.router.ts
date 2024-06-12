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
        this.router.get('/', userAuth.accesToken, cartController.getCart)
        this.router.post('/', userAuth.accesToken, cartController.createCart)
        this.router.patch(
            '/',
            userAuth.accesToken,
            cartController.updateCartQuantity
        )
        this.router.delete('/', userAuth.accesToken, cartController.deletCart)
    }

    public getRouter() {
        return this.router
    }
}

export default new CartRouter()
