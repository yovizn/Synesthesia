import { Prisma } from '@prisma/client'
import { sign, verify, type SignOptions } from 'jsonwebtoken'

import { prisma } from '../../libs/prisma'
import { nanoid, generateReferral } from '../../utils/generate'
import { comparePassword, hashPassword } from '../../utils/hashPassword'
import { BASE_URL, NODEMAILER_USER, SECRET_KEY } from '../../configs/env'
import { transpoter } from '../../helpers/nodemailer'

import type { User } from '@prisma/client'
import type { Request } from 'express'
import type { UserType } from '../../models/user.model'
import { emailTemplate } from '../../templates/email-template'

class EchosService {
    async register(req: Request) {
        const {
            username,
            email,
            referrance,
            firstname,
            lastname,
            password,
            gender,
        } = req.body as User

        await prisma.$transaction(
            async () => {
                const checkUser = await prisma.user.findFirst({
                    where: { OR: [{ email }, { username }] },
                    select: { id: true },
                })

                if (checkUser)
                    throw new Error('Username or Email is already exist', {
                        cause: 'The provided username or email address is already associated with an existing account in the system.',
                    })
                if (referrance) {
                    const checkReferral = await prisma.user.findFirst({
                        where: {
                            referral: referrance,
                        },
                        select: {
                            id: true,
                            point: true,
                        },
                    })

                    if (!checkReferral)
                        throw new Error(
                            'Invalid referral code. Please check and try again. ',
                            {
                                cause: 'The referral code provided does not match the expected format or is incorrect.',
                            }
                        )

                    await prisma.user.update({
                        where: { id: checkReferral.id },
                        data: { point: checkReferral.point + 10000 },
                    })
                }
                const hashPass = await hashPassword(password)
                const referral = generateReferral(1).toUpperCase()
                const data: Prisma.UserCreateInput = {
                    id: nanoid(),
                    firstname,
                    lastname,
                    username,
                    email,
                    referrance: !referrance ? null : referrance,
                    referral,
                    password: hashPass,
                    gender,
                }
                const token = sign(data.id, SECRET_KEY)
                const baseUrl = BASE_URL
                const { html } = emailTemplate({
                    firstname,
                    lastname,
                    token,
                    baseUrl,
                })
                await prisma.user.create({ data })

                await transpoter.sendMail({
                    from: NODEMAILER_USER,
                    to: data.email,
                    subject: 'Welcome to Synesthesia',
                    html,
                })
            },
            {
                maxWait: 5000,
                timeout: 10000,
                isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
            }
        )
    }

    async keepLogin(req: Request) {
        const user = await prisma.user.findUnique({
            select: {
                id: true,
                username: true,
                email: true,
                firstname: true,
                lastname: true,
            },
            where: {
                id: req.user?.id,
            },
        })

        if (!user) throw new Error('Need to login')

        const access_token = sign(user, SECRET_KEY, { expiresIn: '2hr' })

        return { access_token }
    }

    async login(req: Request) {
        const { username_email, password } = req.body
        const select: Prisma.UserSelectScalar = {
            id: true,
            firstname: true,
            lastname: true,
            username: true,
            password: true,
            email: true,
            address: true,
            birth: true,
            gender: true,
            isVerified: true,
            phoneNumber: true,
            point: true,
            referral: true,
        }
        const data: UserType = await prisma.user.findFirst({
            where: {
                OR: [{ username: username_email }, { email: username_email }],
            },
            select,
        })

        if (!data?.password) throw new Error('Wrong Username or Email')
        const checkUser = await comparePassword(data.password, password)
        if (!checkUser) throw new Error('Wrong password')
        if (!data.isVerified) {
            const token = sign({ id: data.id }, SECRET_KEY, {
                expiresIn: '15m',
            })
            const baseUrl = BASE_URL
            const { html } = emailTemplate({
                firstname: data.firstname,
                lastname: data.lastname,
                token,
                baseUrl,
            })
            await transpoter.sendMail({
                from: NODEMAILER_USER,
                to: data.email,
                subject: 'Welcome to Synesthesia',
                html,
            })

            throw new Error('Need verify your account', {
                cause: 'Sorry, you need to check your email or try it again',
            })
        }

        delete data.password

        const accessToken = sign({ id: data.id }, SECRET_KEY, {
            expiresIn: '15m',
        })
        const refreshToken = sign(data, SECRET_KEY, {
            expiresIn: '2hr',
        })
        return { accessToken, refreshToken }
    }

    async validation(req: Request) {
        const { token } = req.params
        const id = verify(token, SECRET_KEY) as string

        await prisma.$transaction(async () => {
            const chechReferral = await prisma.user.findFirst({
                where: { id },
                select: { referrance: true },
            })
            if (chechReferral?.referrance) {
                prisma.voucher.update({
                    where: { id },
                    data: { userId: id },
                })
            }
            await prisma.user.update({
                where: { id },
                data: { isVerified: true },
            })
        })
    }
}

export default new EchosService()
