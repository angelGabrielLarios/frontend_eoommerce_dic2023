

import { IProductsReponse } from ".";
import { ExceptionNestjs, IExceptionNestJs } from "./errors"
import { urlAPI } from "./url"

interface Props {
    idUser: string,
    idProduct: string
}


export interface ICartDetailsRes {
    id: string;
    quantity: number;
    status: string;
    product: IProductsReponse;
    shoppingCart: ShoppingCart;
}


export interface ShoppingCart {
    id: string;
    createdDate: string;
}

export const addProductToCart = async (pros: Props) => {

    const response = await fetch(`${urlAPI}/shopping-cart/add-product`, {
        method: 'POST',
        body: JSON.stringify(pros),
        headers: {
            "Content-Type": "application/json"
        },
    })

    if (!response.ok) {
        const data: IExceptionNestJs = await response.json()
        throw new ExceptionNestjs(data)
    }

    const data: ICartDetailsRes = await response.json() as ICartDetailsRes
    return data


}
