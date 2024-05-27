import type { NextFunction, Request, Response } from 'express'
import echoService from '../services/echo.service'
import { BASE_URL, SECRET_KEY } from '../../configs/env'
import { prisma } from '../../libs/prisma'
import { sign } from 'jsonwebtoken'

class EchoController {
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { accessToken, refreshToken } = await echoService.login(req)
            res.cookie('access_token', accessToken)
                .cookie('refresh_token', refreshToken)
                .send({
                    title: 'Login Successful',
                    description:
                        'Welcome back! You have successfully logged in to your account.',
                })
        } catch (error) {
            next(error)
        }
    }
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            await echoService.register(req)

            res.status(201).send({
                title: 'Congratulations! Your email has been successfully created.',
                description:
                    'Email successfully created. Please check your email inbox for further instructions.',
            })
        } catch (error) {
            next(error)
        }
    }
    async validation(req: Request, res: Response, next: NextFunction) {
        try {
            await echoService.validation(req)
            res.status(200).send({
                title: "You're verify",
                description: "You're good to go",
            })
        } catch (error) {
            next(error)
        }
    }
    async keepLogin(req: Request, res: Response, next: NextFunction) {
        try {
            const { access_token } = await echoService.keepLogin(req)

            res.cookie('access_token', access_token, { httpOnly: false }).send({
                title: 'Login Successful',
                description:
                    'Welcome back! You have successfully logged in to your account.',
            })
        } catch (error) {
            next(error)
        }
    }
}

export default new EchoController()
