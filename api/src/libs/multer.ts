import multer from 'multer'
import { join } from 'path'
import { type Request } from 'express'
import type { DestinationCb, FilenameCb } from '../models/multer.model'

const maxSize = 1024 * 1024 * 1024

const multerConfig: multer.Options = {
    fileFilter: (req, file, cb) => {
        if (file.mimetype.split('/')[0] !== 'image') {
            return cb(new Error("file type isn't image"))
        }
        const fileSize = parseInt(req.headers['content-length'] || '')
        if (fileSize > maxSize) {
            return cb(new Error('Max size 1GB'))
        }
        return cb(null, true)
    },
    limits: {
        fileSize: maxSize,
    },
}

export function uploader(filePrefix: string, folderName?: string) {
    const defaultDir = join(__dirname, '../public/images/')
    const storage = multer.diskStorage({
        destination: (
            req: Request,
            file: Express.Multer.File,
            cb: DestinationCb
        ) => {
            const destination = folderName
                ? defaultDir + folderName
                : defaultDir
            cb(null, destination)
        },
        filename: (req: Request, file: Express.Multer.File, cb: FilenameCb) => {
            const originalNameParts = file.originalname.split('.')
            const fileExtension =
                originalNameParts[originalNameParts.length - 1]
            const newFileName = filePrefix + Date.now() + '.' + fileExtension
            cb(null, newFileName)
        },
    })
    return multer({ storage, ...multerConfig })
}

export function blobUploader() {
    return multer({ ...multerConfig })
}
