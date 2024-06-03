import express from 'express'
import type { Application, Request, Response, NextFunction } from 'express'

import echoRouter from './routers/echo.router'
import { PORT } from '../configs/env'
import { cors, corsOptions } from '../utils/cors'
import promotorRouter from './routers/promotor.router'
import eventRouter from './routers/event.router'
import imagesRouter from './routers/images.router'

export class App {
    private app: Application
    constructor() {
        this.app = express()
        this.configures()
        this.routes()
        this.errorsHandler()
    }

    private configures() {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(cors(corsOptions))
    }

    private routes() {
        // GET All
        this.app.get('/', (req: Request, res: Response) => {
            res.status(200).send({
                message: 'Synesthesia API',
            })
        })

        this.app.use('/echos', echoRouter.getRouter())
        this.app.use('/events', eventRouter.getRouter())
        this.app.use('/promotors', promotorRouter.getRouter())
        this.app.use('/images', imagesRouter.getRouter())
    }

    private errorsHandler() {
        this.app.use(
            (err: unknown, req: Request, res: Response, next: NextFunction) => {
                if (err instanceof Error)
                    res.status(500).send({
                        message: err.message,
                        cause: err.cause,
                    })
            }
        )
    }

    public start() {
        this.app.listen(PORT, () => console.log('RUN ON PORT:', PORT))
    }
}
