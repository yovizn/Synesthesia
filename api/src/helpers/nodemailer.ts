import { createTransport } from 'nodemailer'

import path from 'path'
import { NODEMAILER_PASSWORD, NODEMAILER_USER } from '../configs/env'

const transpoter = createTransport({
    service: 'gmail',
    auth: {
        user: NODEMAILER_USER,
        pass: NODEMAILER_PASSWORD,
    },
})

const verifyEmailPath = path.join(
    __dirname,
    '../templates',
    'verify-register.hbs'
)

const verifyForgetEmailPath = path.join(
    __dirname,
    '../templates',
    'verify-forget.hbs'
)

export { transpoter, verifyEmailPath, verifyForgetEmailPath }
