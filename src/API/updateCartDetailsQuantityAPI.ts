import { ICartDetailsRes } from "."
import { ExceptionNestjs, IExceptionNestJs } from "./errors"
import { urlAPI } from "./url"


export const updateCartDetailsQuantityAPI = async ({ quantity, idCartDetails }: { quantity: number, idCartDetails: string }) => {

    const response = await fetch(`${urlAPI}/cart-details/update-quantity/${idCartDetails}`, {
        method: 'PATCH',
        body: JSON.stringify({ quantity }),
        headers: {
            "Content-Type": "application/json"
        },
    })

    if (!response.ok) {
        const data: IExceptionNestJs = await response.json() as IExceptionNestJs
        throw new ExceptionNestjs(data)
    }

    const data: ICartDetailsRes = await response.json() as ICartDetailsRes
    return data


}
