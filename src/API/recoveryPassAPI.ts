

import { ExceptionNestjs, IExceptionNestJs } from "./errors"

import { urlAPI } from "./url"


export interface IRecoveryPass {
    tokenRecoveryPass: string
    emailRecoveryPass: string
}
export const recoveryPassAPI = async (email: string,) => {


    const response = await fetch(`${urlAPI}/auth/recovery-password-by-email`, {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: {
            "Content-Type": "application/json"
        },
    })

    if (!response.ok) {
        const data: IExceptionNestJs = await response.json() as IExceptionNestJs
        throw new ExceptionNestjs(data)
    }

    const data: IRecoveryPass = await response.json() as IRecoveryPass
    return data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
}



