import type { NextFunction, Request, Response } from 'express'
import transactionService from '../services/transaction.service'

class TransactionController {
    async getTrasaction(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await transactionService.getTrasaction(req)
            res.send(data)
        } catch (error) {
            next(error)
        }
    }

    async updateTransactionStatus(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            console.log(req.body)
            const data = await transactionService.updateTransactionStatus(req)
            res.send(data)
        } catch (error) {
            next(error)
        }
    }

    async createTransaction(req: Request, res: Response, next: NextFunction) {
        try {
            const transaction = await transactionService.createTransaction(req)
            res.send({
                title: '',
                description: '',
                transaction,
            })
        } catch (error) {
            next(error)
        }
    }
}

export default new TransactionController()
