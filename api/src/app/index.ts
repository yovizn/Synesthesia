import express from 'express'
import type { Application, Request, Response, NextFunction } from 'express'

import echoRouter from './routers/echo.router'
import { PORT } from '../configs/env'
import { cors, corsOptions } from '../utils/cors'

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
        this.app.use(express.urlencoded())
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
        // this.app.use('/deltas')
    }

    private errorsHandler() {
        this.app.use(
            (err: unknown, req: Request, res: Response, next: NextFunction) => {
                if (err instanceof Error) res.status(500).send(err.message)
            }
        )
    }

    public start() {
        this.app.listen(PORT, () => console.log('RUN ON PORT: ', PORT))
    }
}
