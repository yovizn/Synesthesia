import type { NextFunction, Request, Response } from 'express'
import imageService from '../services/image.service'

class ImageController {
    async renderWebp(req: Request, res: Response, next: NextFunction) {
        try {
            const image = await imageService.renderWebp(req)
            res.set('Content-type', 'image/webp')
            res.send(image)
        } catch (error) {
            next(error)
        }
    }

    async renderPng(req: Request, res: Response, next: NextFunction){
      try {
        const image = await imageService.renderPng(req)
        res.set('Content-type', 'image/png')
        res.send(image)
      } catch (error) {
        next(error)
      }
    }
}

export default new ImageController()
