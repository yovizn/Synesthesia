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
        // [x] Feature register
        this.router.post(
            '/v1',
            blobUploader().single('avatar'),
            echoController.register
        )
        this.router.get('/v1/:token', echoController.registerValidation)

        // [x] Feature login
        this.router.post('/v2', echoController.login)
        this.router.get('/v2', userAuth.refreshToken, echoController.keepLogin)

        // [ ] Feature edit users
        this.router.patch(
            '/v2/:username',
            userAuth.accesToken,
            blobUploader().single('avatar'),
            echoController.editUser
        )

        // [x] Feature forget password
        this.router.get('/validations/:username', echoController.getForgetUser)
        this.router.post('/validations', echoController.validationEmail)
        this.router.post(
            '/validations/:token',
            userAuth.forgetPasswordToken,
            echoController.forgetPassword
        )

        // this.router.post('/v3/:username', echoController.editPassword)
        // this.router.get('/avatars/:id', echoController.getAvatarById)
    }

    public getRouter() {
        return this.router
    }
}

export default new EchosRouter()
