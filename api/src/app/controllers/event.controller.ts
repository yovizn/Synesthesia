import type { NextFunction, Request, Response } from 'express'
import eventService from '../services/event.service'

class EventController {
    async getEvent(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await eventService.getEvent(req)
            res.send(data)
        } catch (error) {
            next(error)
        }
    }
}

export default new EventController()
