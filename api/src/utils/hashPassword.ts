import { genSalt, hash, compare } from 'bcrypt'

const hashPassword = async (payload: string) => {
    const salt = await genSalt(10)
    return await hash(payload, salt)
}

const comparePassword = async (hashPassword: string, password: string) => {
    return await compare(password, hashPassword)
}

export { hashPassword, comparePassword }
