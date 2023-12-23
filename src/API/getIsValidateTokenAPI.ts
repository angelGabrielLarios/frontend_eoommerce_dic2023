/* getIsValidateTokenAPI */


import { ExceptionNestjs, IExceptionNestJs } from "./errors"
import { urlAPI } from "./url"


export interface IIsValidateToken {
    isValidateToken: boolean
}
export const getIsValidateTokenAPI = async ({ token }: { token: string }) => {

    const response = await fetch(`${urlAPI}/tokens/validate-token/${token}`)

    if (!response.ok) {
        const data: IExceptionNestJs = await response.json()
        throw new ExceptionNestjs(data)
    }

    const data: IIsValidateToken = await response.json() as IIsValidateToken
    return data


}