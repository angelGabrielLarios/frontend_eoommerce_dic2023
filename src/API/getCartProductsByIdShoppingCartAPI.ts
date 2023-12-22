import { ICartDetailsRes } from "."
import { ExceptionNestjs, IExceptionNestJs } from "./errors"
import { urlAPI } from "./url"

export const getCartProductsByIdShoppingCartAPI = async ({ idShoppingCart }: { idShoppingCart: string }) => {

    const response = await fetch(`${urlAPI}/cart-details/idShoppingCart/${idShoppingCart}`)

    if (!response.ok) {
        const data: IExceptionNestJs = await response.json()
        throw new ExceptionNestjs(data)
    }

    const data: ICartDetailsRes[] = await response.json() as ICartDetailsRes[]
    return data


}