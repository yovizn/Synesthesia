import type { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { SECRET_KEY } from '../configs/env'
import type { UserType } from '../models/user.model'

class UserAuth {
    async checkUser(req: Request, res: Response, next: NextFunction) {
        try {
            const token =
                req.headers.authorization?.replace('Bearer ', '') || ''
            req.user = verify(token, SECRET_KEY) as UserType

            next()
        } catch (error) {
            next(error)
        }
    }
    async refreshToken(req: Request, res: Response, next: NextFunction) {
        try {
            const token =
                req.headers.authorization?.replace('Bearer ', '') || ''

            req.user = verify(token, SECRET_KEY) as UserType
            next()
        } catch (error) {
            next(error)
        }
    }
}

export default new UserAuth()
