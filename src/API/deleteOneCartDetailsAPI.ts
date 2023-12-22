
import { ExceptionNestjs, IExceptionNestJs } from "./errors"
import { urlAPI } from "./url"


export interface IDeleteCartDetailsRes {
    status: boolean,
    message: string,
    id_delelte: string
}

export const deleteOneCartDetailsAPI = async ({ id }: { id: string }) => {

    const response = await fetch(`${urlAPI}/cart-details/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (!response.ok) {
        const data: IExceptionNestJs = await response.json()
        throw new ExceptionNestjs(data)
    }

    const data: IDeleteCartDetailsRes = await response.json() as IDeleteCartDetailsRes
    return data


}