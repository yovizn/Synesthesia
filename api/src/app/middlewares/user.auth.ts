import type { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import type { UserType } from '../../models/user.model'
import {
    SECRET_KEY_REFRESH,
    SECRET_KEY_FORGET_PASSWORD_ACCESS,
    SECRET_KEY_ACCESS,
} from '../../configs/env'
import { prisma } from '../../libs/prisma'

class UserAuth {
    async accesToken(req: Request, res: Response, next: NextFunction) {
        try {
            const token =
                req.headers.authorization?.replace('Bearer ', '') || ''
            req.user = verify(token, SECRET_KEY_ACCESS) as UserType

            console.log(req.body)

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
            req.user = verify(
                token,
                SECRET_KEY_FORGET_PASSWORD_ACCESS
            ) as UserType // { username: string }
            next()
        } catch (error) {
            next(error)
        }
    }

    public isPromotor(user: UserType) {
        if (user?.Promotor?.id) return true
        return false
    }
}

export default new UserAuth()
