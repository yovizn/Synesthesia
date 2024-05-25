import { createTransport } from 'nodemailer'
import { NODEMAILER_PASSWORD, NODEMAILER_USER } from '../configs/env'

const transpoter = createTransport({
    service: 'gmail',
    auth: {
        user: NODEMAILER_USER,
        pass: NODEMAILER_PASSWORD,
    },
})

// const tempPath = path.join

export { transpoter }
