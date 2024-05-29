import { Prisma } from '@prisma/client'
import { sign, verify } from 'jsonwebtoken'

import { prisma } from '../../libs/prisma'
import { nanoid, generateReferral } from '../../utils/generate'
import { comparePassword, hashPassword } from '../../utils/hashPassword'
import {
    BASE_URL,
    NODEMAILER_USER,
    SECRET_KEY_ACCESS,
    SECRET_KEY_REFRESH,
} from '../../configs/env'
import {
    transpoter,
    verifyEmailPath,
    verifyForgetEmailPath,
} from '../../helpers/nodemailer'

import type { User } from '@prisma/client'
import type { Request } from 'express'
import type { UserType } from '../../models/user.model'
import { emailTemplate } from '../../templates/email-template'
import { createToken } from '../../libs/jwt'
import { add } from 'date-fns'
import sharp from 'sharp'
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

        const { file } = req

        return await prisma.$transaction(
            async () => {
                const checkUser = await prisma.user.findFirst({
                    where: { OR: [{ email }, { username }] },
                    select: { id: true },
                })

                if (checkUser?.id)
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
                            expPoint: true,
                        },
                    })

                    if (!checkReferral)
                        throw new Error(
                            'Invalid referral code. Please check and try again. ',
                            {
                                cause: 'The referral code provided does not match the expected format or is incorrect.',
                            }
                        )

                    const newExpDate = add(new Date(), { months: 3 })

                    await prisma.user.update({
                        where: { id: checkReferral.id },
                        data: {
                            point:
                                checkReferral.expPoint! > new Date()
                                    ? checkReferral.point + 10000
                                    : 10000,
                            expPoint: newExpDate,
                        },
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

                if (file) {
                    const avatar = await sharp(file.buffer).png().toBuffer()
                    data.avatar = avatar
                }
                const token = sign({ id: data.id }, SECRET_KEY_ACCESS, {
                    expiresIn: '15m',
                })
                const baseUrl = BASE_URL
                const { html } = emailTemplate({
                    firstname,
                    lastname,
                    token,
                    baseUrl,
                    path: verifyEmailPath,
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

    async login(req: Request) {
        const { username_email, password } = req.body
        const select: Prisma.UserSelect = {
            id: true,
            firstname: true,
            lastname: true,
            username: true,
            address: true,
            birth: true,
            avatar: true,
            email: true,
            gender: true,
            point: true,
            expPoint: true,
            phoneNumber: true,
            referral: true,
            password: true,
            isVerified: true,
            _count: {
                select: { Transaction: true },
            },
        }
        const data: UserType = await prisma.user.findFirst({
            where: {
                OR: [{ username: username_email }, { email: username_email }],
            },
            select,
        })

        if (!data?.password) throw new Error('Wrong Username or Email')
        const checkUser = await comparePassword(data.password, password)
        const date = new Date(data.createdAt!)
        const now = new Date()
        const time = now.getTime() - date.getTime()
        const tolerance = 1 * 60 * 1000
        if (!checkUser) throw new Error('Wrong password')
        if (!data.isVerified) {
            if (time > tolerance) {
                const token = sign({ id: data.id }, SECRET_KEY_ACCESS, {
                    expiresIn: '15m',
                })
                const baseUrl = BASE_URL
                const { html } = emailTemplate({
                    firstname: data.firstname,
                    lastname: data.lastname,
                    token,
                    baseUrl,
                    path: verifyForgetEmailPath,
                })

                await transpoter.sendMail({
                    from: NODEMAILER_USER,
                    to: data.email,
                    subject: 'Welcome to Synesthesia',
                    html,
                })
            }
            throw new Error('Need verify your account', {
                cause: 'Sorry, you need to check your email or try it again',
            })
        }

        delete data.password

        const access_token = createToken(data, SECRET_KEY_ACCESS, '1hr')
        const refresh_token = createToken(
            { id: data.id },
            SECRET_KEY_REFRESH,
            '20hr'
        )

        return { access_token, refresh_token }
    }

    async keepLogin(req: Request) {
        const select: Prisma.UserSelectScalar = {
            id: true,
            avatar: true,
            firstname: true,
            lastname: true,
            username: true,
            email: true,
            birth: true,
            gender: true,
            address: true,
            referral: true,
            point: true,
            phoneNumber: true,
            expPoint: true,
        }

        return await prisma.$transaction(async () => {
            const user = await prisma.user.findUnique({
                select,
                where: {
                    id: req.user?.id,
                },
            })

            if (!user?.id) throw new Error('Need to login')

            const checkDate = user?.expPoint
            const nowDate = new Date()

            if (checkDate === nowDate)
                await prisma.user.update({
                    where: { id: user.id },
                    data: { point: 0 },
                })

            const access_token = createToken(user, SECRET_KEY_ACCESS, '1hr')
            return { access_token, is_verified: user.isVerified }
        })
    }

    async getAvatarById(req: Request) {
        const { id } = req.params

        const user = await prisma.user.findUnique({
            where: { id },
            select: { avatar: true },
        })

        return user?.avatar
    }

    async editPassword(req: Request) {
        await prisma.$transaction(async () => {
            const { username } = req.params
            const { new_assword, password } = req.body

            const user = await prisma.user.findFirst({
                where: { username },
                select: { password },
            })

            const checkPassword = await comparePassword(
                user?.password!,
                password
            )

            if (!checkPassword)
                throw new Error('Wrong password', {
                    cause: 'Invalid your current password',
                })

            await prisma.user.update({
                where: { username },
                data: { password: await hashPassword(new_assword) },
            })
        })
    }

    async editUser(req: Request) {
        const params = req.params.username
        const {
            firstname,
            lastname,
            username,
            email,
            address,
            birth,
            phoneNumber,
        } = req.body as User
        const { file } = req

        await prisma.$transaction(async () => {
            const data: Prisma.UserUpdateInput = {
                firstname,
                lastname,
                username,
                email,
                address,
                birth,
                phoneNumber,
            }

            if (file) {
                const avatar = await sharp(file.buffer).png().toBuffer()
                data.avatar = avatar
            }

            await prisma.user.update({
                data,
                where: { username: params },
            })
        })
    }

    async forgetPassword(req: Request) {}

    async validationEmail(req: Request) {
        const { email } = req.body

        const user = await prisma.user.findFirst({
            where: { email },
            select: { id: true, email: true, firstname: true, lastname: true },
        })

        if (!user?.id) throw new Error('Invalid email')

        const token = sign(user, SECRET_KEY_REFRESH, { expiresIn: '15m' })

        await transpoter.sendMail({})
    }

    async validation(req: Request) {
        const { token } = req.params
        const value = verify(token, SECRET_KEY_ACCESS) as { id: string }

        await prisma.$transaction(async () => {
            const chechReferral = await prisma.user.findFirst({
                where: { id: value.id },
                select: { referrance: true },
            })

            if (chechReferral?.referrance) {
                await prisma.voucher.create({
                    data: { id: nanoid(), userId: value.id },
                })
            }
            await prisma.user.update({
                where: { id: value.id },
                data: { isVerified: true },
            })
        })
    }
}

export default new EchosService()
