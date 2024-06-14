import { Router } from 'express'
import userAuth from '../middlewares/user.auth'
import transactionController from '../controllers/transaction.controller'

class TransactionRouter {
    private router
    constructor() {
        this.router = Router()
        this.initializedRoutes()
    }

    private initializedRoutes() {
        this.router.post(
            '/v1/:id',
            userAuth.accesToken,
            transactionController.updateTransactionStatus
        )
        this.router.get(
            '/system',
            userAuth.accesToken,
            transactionController.getTrasaction
        )
        this.router.post(
            '/system',
            userAuth.accesToken,
            transactionController.createTransaction
        )
    }

    public getRouter() {
        return this.router
    }
}

export default new TransactionRouter()
