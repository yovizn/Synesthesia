import type { NextFunction, Request, Response } from 'express'
import echoService from '../services/echo.service'
import { BASE_URL } from '../../configs/env'

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
            res.sendFile(__dirname + '../templates/index.html')
        } catch (error) {
            next(error)
        }
    }
}

export default new EchoController()
