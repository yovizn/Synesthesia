import type { NextFunction, Request, Response } from 'express'
import echoService from '../services/echo.service'

class EchoController {
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            await echoService.register(req)

            res.status(201).send({
                title: 'Congratulations! Your Account has been successfully created.',
                description:
                    'Please check your email inbox for further access.',
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

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { access_token, refresh_token } = await echoService.login(req)
            res.send({
                title: 'Login Successful',
                description:
                    'Welcome back! You have successfully logged in to your account.',
                access_token,
                refresh_token,
            })
        } catch (error) {
            next(error)
        }
    }

    async keepLogin(req: Request, res: Response, next: NextFunction) {
        try {
            const { access_token, is_verified } = await echoService.keepLogin(
                req
            )
            res.send({
                title: 'Login Successful',
                description:
                    'Welcome back! You have successfully logged in to your account.',
                access_token,
                is_verified,
            })
        } catch (error) {
            next(error)
        }
    }

    async getAvatarById(req: Request, res: Response, next: NextFunction) {
        try {
            const avatar = await echoService.getAvatarById(req)
            res.set('Content-type', 'image/png')
            res.send(avatar)
        } catch (error) {
            console.log('test')
            next(error)
        }
    }

    async editUser(req: Request, res: Response, next: NextFunction) {
        try {
            await echoService.editUser(req)
            res.send({
                title: '',
                description: '',
            })
        } catch (error) {
            next(error)
        }
    }

    async editPassword(req: Request, res: Response, next: NextFunction) {
        try {
            await echoService.editPassword(req)
            res.send({
                title: 'Your password has been changed',
                description: 'successfully changing password',
            })
        } catch (error) {
            next(error)
        }
    }

    async validationEmail(req: Request, res: Response, next: NextFunction) {
        try {
            await echoService.validation(req)
            res.send({
                title: 'Please check your email.',
                description:
                    'Please check your email inbox for further access.',
            })
        } catch (error) {
            next(error)
        }
    }

    async forgetPassword(req: Request, res: Response, next: NextFunction) {
        try {
            await echoService.forgetPassword(req)
            res.send({
                title: 'Your password has been changed',
                description:
                    'successfully changing password, please login now.',
            })
        } catch (error) {
            next(error)
        }
    }
}

export default new EchoController()
