

import { ExceptionNestjs, IExceptionNestJs } from "./errors"
import { ILoginResponse } from "./interfaces"
import { urlAPI } from "./url"
export const registerAPI = async (firstName: string, lastName: string, phone: string, email: string, password: string) => {


    const response = await fetch(`${urlAPI}/auth/register`, {
        method: 'POST',
        body: JSON.stringify({ firstName, lastName, phone, email, password }),
        headers: {
            "Content-Type": "application/json"
        },
    })

    if (!response.ok) {
        const data: IExceptionNestJs = await response.json() as IExceptionNestJs
        throw new ExceptionNestjs(data)
    }

    const data: ILoginResponse = await response.json() as ILoginResponse

    return data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
}



