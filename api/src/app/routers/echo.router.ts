import { Router } from 'express'
import echoController from '../controllers/echo.controller'
import userAuth from '../middlewares/user.auth'
import { blobUploader } from '../../libs/multer'

class EchosRouter {
    private router: Router
    constructor() {
        this.router = Router()
        this.initializedRoutes()
    }

    private initializedRoutes() {
        // Feature register
        this.router.post(
            '/v1',
            blobUploader().single('avatar'),
            echoController.register
        )
        this.router.get('/v1/:token', echoController.registerValidation)

        // Feature login
        this.router.post('/v2', echoController.login)
        this.router.get('/v2', userAuth.refreshToken, echoController.keepLogin)

        this.router.patch(
            '/v3/:username',
            userAuth.accesToken,
            blobUploader().single('avatar'),
            echoController.editUser
        )
        this.router.post('/v3/:username', echoController.editPassword)
        this.router.get('/avatars/:id', echoController.getAvatarById)

        // Feature forget password
        this.router.post('/validations', echoController.validationEmail)
        this.router.get('/validations', userAuth.forgetPasswordToken, echoController.forgetPasswordAccess)
        this.router.post('/validations/:token', echoController.forgetPassword)
    }

    public getRouter() {
        return this.router
    }
}

export default new EchosRouter()
