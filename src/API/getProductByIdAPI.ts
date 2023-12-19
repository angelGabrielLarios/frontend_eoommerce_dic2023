import { IProductsReponse } from "."
import { ExceptionNestjs, IExceptionNestJs } from "./errors"
import { urlAPI } from "./url"

export const getProductsByIdAPI = async ({ id }: { id: string }) => {

    const response = await fetch(`${urlAPI}/products/${id}`)

    if (!response.ok) {
        const data: IExceptionNestJs = await response.json()
        throw new ExceptionNestjs(data)
    }

    const data: IProductsReponse = await response.json() as IProductsReponse
    return data


}