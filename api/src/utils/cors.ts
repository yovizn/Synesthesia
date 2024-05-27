import cors from 'cors'
import { type CorsOptions } from 'cors'
import { BASE_URL } from '../configs/env'

const corsOptions: CorsOptions = {
    origin: true,
    credentials: true,
}

export { cors, corsOptions }
