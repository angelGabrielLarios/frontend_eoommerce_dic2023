import { ExceptionNestjs, IExceptionNestJs } from "./errors"
import { urlAPI } from "./url"


export const changeStatusCompleSC = async ({ shoppingCartId }: { shoppingCartId: string }) => {

    const response = await fetch(`${urlAPI}/shopping-cart/change-status-complete/${shoppingCartId}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
    })

    if (!response.ok) {
        const data: IExceptionNestJs = await response.json() as IExceptionNestJs
        throw new ExceptionNestjs(data)
    }

    const data = await response.json()

    return data
}
