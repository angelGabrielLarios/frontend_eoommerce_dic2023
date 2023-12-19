

import { ExceptionNestjs, IExceptionNestJs } from "./errors"
import { urlAPI } from "./url"
export const getUserAPI = async (access_token: string) => {

    const response = await fetch(`${urlAPI}/auth/profile`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${access_token}`
        },
    })

    if (!response.ok) {
        const data: IExceptionNestJs = await response.json()
        throw new ExceptionNestjs(data)
    }

    const data = await response.json()
    return data


}
