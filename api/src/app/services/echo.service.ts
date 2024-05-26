import { Prisma } from '@prisma/client'
import { compile } from 'handlebars'
import { readFileSync } from 'fs'
import { sign, verify } from 'jsonwebtoken'

import { prisma } from '../../libs/prisma'
import { nanoid, generateReferral } from '../../utils/generate'
import { comparePassword, hashPassword } from '../../utils/hashPassword'
import { NODEMAILER_USER, SECRET_KEY } from '../../configs/env'
import { transpoter, verifyEmailPath } from '../../helpers/nodemailer'

import type { User } from '@prisma/client'
import type { Request } from 'express'
import type { UserType } from '../../models/user.model'

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
                const tempSource = readFileSync(verifyEmailPath, 'utf-8')
                const compiledTemp = compile(tempSource)
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
                await prisma.user.create({ data })
                const html = compiledTemp({ firstname, lastname, token })
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
        const where: Prisma.UserScalarWhereWithAggregatesInput = {
            OR: [{ email: username_email }, { email: username_email }],
        }
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
            where,
            select,
        })

        if (!data?.password) throw new Error('Wrong Username or Email')
        const checkUser = await comparePassword(data.password, password)
        if (!checkUser) throw new Error('Wrong password')
        if (!data.isVerified)
            throw new Error('Need verify your account', {
                cause: 'Sorry, you need to check your email or try it again',
            })

        delete data.password

        const accessToken = sign(data, SECRET_KEY, { expiresIn: '1m' })
        const refreshToken = sign({ id: data.id }, SECRET_KEY, {
            expiresIn: '15m',
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
