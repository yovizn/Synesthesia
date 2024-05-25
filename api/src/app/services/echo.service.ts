import { sign, verify } from 'jsonwebtoken'
import { Prisma } from '@prisma/client'

import { prisma } from '../../libs/prisma'
import { nanoid, generateReferral } from '../../utils/generate'
import { comparePassword, hashPassword } from '../../utils/hashPassword'
import { NODEMAILER_USER, SECRET_KEY } from '../../configs/env'

import type { User } from '@prisma/client'
import type { Request } from 'express'
import type { UserType } from '../../models/user.model'
import { transpoter } from '../../helpers/nodemailer'

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

        return await prisma.$transaction(
            async () => {
                const checkUser = await prisma.user.findFirst({
                    where: { OR: [{ email }, { username }] },
                    select: { id: true },
                })

                if (checkUser)
                    throw new Error('Sorry, username or email is already used')
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
                        throw new Error('Sorry, referral code is invalid')

                    await prisma.user.update({
                        where: { id: checkReferral.id },
                        data: { point: checkReferral.point + 10000 },
                    })
                }
                const hashPass = await hashPassword(password)
                const referral = generateReferral(1)
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

                await prisma.user.create({ data })
                // await transpoter.sendMail({
                //     from: NODEMAILER_USER,
                //     to: data.email,
                //     subject: 'Welcome to Synesthesia',
                //     html,
                // })
                return { token: sign(data.id, SECRET_KEY) }
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
        // if (!data.isVerified)
        //     throw new Error(
        //         'Sorry you need to verify your account, check your email or try it again'
        //     )

        delete data.password

        const accessToken = sign(data, SECRET_KEY, { expiresIn: '1hr' })
        const refreshToken = sign(data.id!, SECRET_KEY, { expiresIn: '1hr' })
        return { accessToken, refreshToken }
    }

    async validation(req: Request) {
        const { token } = req.params
        const id = verify(token, SECRET_KEY) as string
        await prisma.user.update({
            data: { isVerified: true },
            where: { id },
        })
    }
}

export default new EchosService()
