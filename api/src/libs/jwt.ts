import { sign, type SignOptions } from 'jsonwebtoken'

const createToken = (
    payload: any,
    SECRET_KEY: string,
    expiresIn?: SignOptions['expiresIn']
) => {
    return sign(payload, SECRET_KEY, { expiresIn })
}

export { createToken }
