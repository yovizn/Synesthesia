import { Router } from 'express'
import echoController from '../controllers/echo.controller'
import userAuth from '../../middlewares/user.auth'
import { blobUploader } from '../../libs/multer'

class EchosRouter {
    private router: Router
    constructor() {
        this.router = Router()
        this.initializedRoutes()
    }

    private initializedRoutes() {
        this.router.get('/verify/:token', echoController.validation)
        this.router.post('/validations', echoController.validationEmail)

        this.router.post(
            '/v1',
            blobUploader().single('avatar'),
            echoController.register
        )
        this.router.post('/v2', echoController.login)
        this.router.get(
            '/v3',
            userAuth.refreshToken,
            echoController.keepLogin
        )
        this.router.get('/avatar/:id', echoController.getAvatarById)
        this.router.patch(
            '/edit-user/:username',
            blobUploader().single('avatar'),
            echoController.editUser
        )
        this.router.post(
            '/edit-password/:username',
            echoController.editPassword
        )
        this.router.post(
            '/forget-password/:token',
            echoController.forgetPassword
        )

        this.router.post(
            '/edit-user/:username',
            blobUploader().single('avatar'),
            echoController.editUser
        )
    }

    public getRouter() {
        return this.router
    }
}

export default new EchosRouter()
