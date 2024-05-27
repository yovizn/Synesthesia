import { compile } from 'handlebars'
import { verifyEmailPath } from '../helpers/nodemailer'
import { readFileSync } from 'fs'

const emailTemplate = ({
    firstname,
    lastname,
    token,
    baseUrl,
}: {
    firstname: string
    lastname: string
    token: string
    baseUrl: string
}) => {
    const tempSource = readFileSync(verifyEmailPath, 'utf-8')
    const compiledTemp = compile(tempSource)
    const html = compiledTemp({
        firstname,
        lastname,
        token,
        baseUrl,
    })

    return { html }
}

export { emailTemplate }
