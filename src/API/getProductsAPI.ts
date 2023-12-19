import { ExceptionNestjs, IExceptionNestJs } from "./errors"
import { urlAPI } from "./url"

export interface IProductsReponse {
    id: string;
    name: string;
    description: string;
    imageURL: string;
    price: number;
    amount: number;
    section: ISection;
}

export interface ISection {
    name: string;
}

export const getProductsAPI = async () => {

    const response = await fetch(`${urlAPI}/products`)

    if (!response.ok) {
        const data: IExceptionNestJs = await response.json()
        throw new ExceptionNestjs(data)
    }

    const data: IProductsReponse[] = await response.json() as IProductsReponse[]
    return data


}

