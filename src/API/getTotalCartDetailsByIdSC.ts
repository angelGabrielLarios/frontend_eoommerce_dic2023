import { ExceptionNestjs, IExceptionNestJs } from "./errors"
import { urlAPI } from "./url"


export interface ITotalFinal {
    shoppingCartId: string;
    total: number;
}
export const getTotalCartDetailsByIdSC = async ({ idShoppingCart }: { idShoppingCart: string }) => {

    const response = await fetch(`${urlAPI}/cart-details/total-final/${idShoppingCart}`)

    if (!response.ok) {
        const data: IExceptionNestJs = await response.json()
        throw new ExceptionNestjs(data)
    }

    const data: ITotalFinal = await response.json() as ITotalFinal
    return data


}