import { ExceptionNestjs, IExceptionNestJs } from "./errors"
import { urlAPI } from "./url"

export interface ISectionResponse {
    id: string;
    name: string;
    createdDate: string;
}

export const getSectionsAPI = async () => {

    const response = await fetch(`${urlAPI}/sections`)

    if (!response.ok) {
        const data: IExceptionNestJs = await response.json()
        throw new ExceptionNestjs(data)
    }

    const data: ISectionResponse[] = await response.json() as ISectionResponse[]
    return data


}

