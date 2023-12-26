import { ExceptionNestjs, IExceptionNestJs } from "./errors"
import { urlAPI } from "./url"

export interface IShopingCartRes {
    id: string;
    createdDate: string;
}


export const getShoppingCartByIdUser = async ({ idUser }: { idUser: string }) => {

    const response = await fetch(`${urlAPI}/shopping-cart/idUser/${idUser}`)

    if (!response.ok) {
        const data: IExceptionNestJs = await response.json()
        throw new ExceptionNestjs(data)
    }

    const data: IShopingCartRes = await response.json() as IShopingCartRes
    return data


}

