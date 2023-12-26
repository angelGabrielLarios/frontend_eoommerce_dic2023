import { ExceptionNestjs, IExceptionNestJs } from "./errors"
import { urlAPI } from "./url"


export interface ISectionVisitedByUserRes {
    id: string;
    createdDate: string;
    section: {
        id: string;
        name: string;
        createdDate: string;
    };
}




export const getSectonsVisitedByUserId = async ({ userId }: { userId: string }) => {
    const response = await fetch(`${urlAPI}/sections-visited/userId/${userId}`)

    if (!response.ok) {
        const data: IExceptionNestJs = await response.json()
        throw new ExceptionNestjs(data)
    }

    const data: ISectionVisitedByUserRes[] = await response.json() as ISectionVisitedByUserRes[]
    return data
}
