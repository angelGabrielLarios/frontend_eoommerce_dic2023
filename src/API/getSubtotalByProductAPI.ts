


import { ExceptionNestjs, IExceptionNestJs } from "./errors"
import { urlAPI } from "./url"


export interface ISubtotalRes {
    shoppingCartId: string;
    cartDetailId: string;
    quantity: number;
    productId: string;
    product_name: string;
    unit_price: number;
    subtotal_by_product: number;
}


export const getSubtotalByProduct = async ({ idShoppingCart, idProduct }: { idShoppingCart: string, idProduct: string }) => {

    const response = await fetch(`${urlAPI}/cart-details/subtotal-product?idShoppingCart=${idShoppingCart}&idProduct=${idProduct}`)

    if (!response.ok) {
        const data: IExceptionNestJs = await response.json()
        throw new ExceptionNestjs(data)
    }

    const data: ISubtotalRes = await response.json() as ISubtotalRes
    return data


}