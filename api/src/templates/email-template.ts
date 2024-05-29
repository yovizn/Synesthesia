import { compile } from 'handlebars'
import { readFileSync } from 'fs'

const emailTemplate = ({
    firstname,
    lastname,
    token,
    baseUrl,
    path,
}: {
    firstname: string
    lastname: string
    token: string
    baseUrl: string
    path: string
}) => {
    const tempSource = readFileSync(path, 'utf-8')
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
