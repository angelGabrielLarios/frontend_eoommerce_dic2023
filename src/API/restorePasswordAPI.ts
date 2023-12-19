
import { ExceptionNestjs, IExceptionNestJs } from "./errors"
import { urlAPI } from "./url"
export const restorePasswordAPI = async (newPassword: string) => {

    const response = await fetch(`${urlAPI}/auth/restore-password`, {
        method: 'PATCH',
        body: JSON.stringify({ newPassword }),
        headers: {
            "Content-Type": "application/json"
        },
    })

    if (!response.ok) {
        const data: IExceptionNestJs = await response.json()
        throw new ExceptionNestjs(data)
    }

    const data = await response.json()
    return data


}
