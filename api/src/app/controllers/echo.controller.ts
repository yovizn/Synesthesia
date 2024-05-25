import type { NextFunction, Request, Response } from 'express'
import echoService from '../services/echo.service'

class EchoController {
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { accessToken, refreshToken } = await echoService.login(req)
            res.cookie('access_token', accessToken)
                .cookie('refresh_token', refreshToken)
                .send('Successed login')
        } catch (error) {
            next(error)
        }
    }
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const { token } = await echoService.register(req)

            res.status(201).send({
                message:
                    'Yeay, you have successfully registered to Synesthesia!',
                token,
            })
        } catch (error) {
            next(error)
        }
    }
    async validation(req: Request, res: Response, next: NextFunction) {
        try {
            await echoService.validation(req)
            res.status(200).send("you're already verified")
        } catch (error) {
            next(error)
        }
    }
}

export default new EchoController()
