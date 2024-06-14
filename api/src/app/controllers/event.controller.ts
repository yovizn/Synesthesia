import type { NextFunction, Request, Response } from 'express'
import userAuth from '../middlewares/user.auth'
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

    async getEventDetail(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await eventService.getEventDetail(req)
            res.send(data)
        } catch (error) {
            next(error)
        }
    }

    async createEvent(req: Request, res: Response, next: NextFunction) {
        if (!userAuth.isPromotor(req.user))
            res.status(403).render('no access privilege')
        try {
            const eventTitle = await eventService.createEvent(req)
            res.send({
                title: 'Successed create event',
                eventTitle: eventTitle.title,
            })
        } catch (error) {
            next(error)
        }
    }

    async editEvent(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await eventService.editEvent(req)
            res.send({ title: 'Event Update Successful', data })
        } catch (error) {
            next(error)
        }
    }

    async deleteEvent(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await eventService.deletEvent(req)
            res.send({
                title: `Successed delete ${data.title}`,
            })
        } catch (error) {
            next(error)
        }
    }

    async getEventCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await eventService.getEventCategory(req)
            res.send(data)
        } catch (error) {
            next(error)
        }
    }
}

export default new EventController()
