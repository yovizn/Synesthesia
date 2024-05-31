import type { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import type { UserType } from '../../models/user.model'
import {
    SECRET_KEY_ACCESS,
    SECRET_KEY_FORGET_PASSWORD,
    SECRET_KEY_REFRESH,
} from '../../configs/env'

class UserAuth {
    async accesToken(req: Request, res: Response, next: NextFunction) {
        try {
            const token =
                req.headers.authorization?.replace('Bearer ', '') || ''
            req.user = verify(token, SECRET_KEY_ACCESS) as UserType

            next()
        } catch (error) {
            next(error)
        }
    }
    async refreshToken(req: Request, res: Response, next: NextFunction) {
        try {
            const token =
                req.headers.authorization?.replace('Bearer ', '') || ''
            req.user = verify(token, SECRET_KEY_REFRESH) as UserType
            next()
        } catch (error) {
            next(error)
        }
    }

    async forgetPasswordToken(req: Request, res: Response, next: NextFunction) {
        try {
            const token =
                req.headers.authorization?.replace('Bearer ', '') || ''
            req.user = verify(token, SECRET_KEY_FORGET_PASSWORD) as UserType // { id: string }
            next()
        } catch (error) {
            next(error)
        }
    }
}

export default new UserAuth()
