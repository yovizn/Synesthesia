export const toSlug = (str: string): string => {
    return str
        .toLocaleLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '')
}
