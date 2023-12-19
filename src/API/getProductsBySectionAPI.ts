import { IProductsReponse } from "."
import { ExceptionNestjs, IExceptionNestJs } from "./errors"
import { urlAPI } from "./url"

export const getProductsBySectionAPI = async ({ nameSection }: { nameSection: string }) => {

    const response = await fetch(`${urlAPI}/products/section/${nameSection}`)

    if (!response.ok) {
        const data: IExceptionNestJs = await response.json()
        throw new ExceptionNestjs(data)
    }

    const data: IProductsReponse[] = await response.json() as IProductsReponse[]
    return data


}