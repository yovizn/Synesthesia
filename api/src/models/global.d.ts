import type { UserType } from './user.model'

declare global {
    namespace Express {
        interface Request {
            user: UserType
            token: string
        }
    }
}
