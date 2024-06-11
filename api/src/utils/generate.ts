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

const generateInvoice = (id: string) => {
    const newDate = new Date()
    const date = newDate.toISOString().replace(/T.*|Z/g, '').replace(/-/g, '')
    return `INV-${date}-${id}${nanoid(5)}`
}

export { nanoid, generateReferral, generateInvoice }
