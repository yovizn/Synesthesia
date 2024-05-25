import { customAlphabet } from 'nanoid'
import { generate } from 'voucher-code-generator'

const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_', 10)
const generateReferral = (count: number) => {
    const g = generate({
        pattern: '####-####',
        count,
        charset: 'alphanumeric',
    })

    return g[0]
}

export { nanoid, generateReferral }
