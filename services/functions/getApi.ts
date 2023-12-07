export const gethApi = async function (url: string, data: any) {
    try {
        let answer = await fetch(url)

        let json = await answer.json()
        return json

    } catch (error) {
        return { error }
    }
}