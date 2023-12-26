
import { ExceptionNestjs, IExceptionNestJs } from "./errors"

import { urlAPI } from "./url"

export interface ISectionVisitedRes {
    user: { id: string };
    section: { id: string };
    id: string;
    createdDate: string;
}



export const registerSectionVisited = async ({ userId, sectionId }: { userId: string, sectionId: string }) => {


    const response = await fetch(`${urlAPI}/sections-visited`, {
        method: 'POST',
        body: JSON.stringify({ userId, sectionId }),
        headers: {
            "Content-Type": "application/json"
        },
    })

    if (!response.ok) {
        const data: IExceptionNestJs = await response.json() as IExceptionNestJs
        throw new ExceptionNestjs(data)
    }

    const data: ISectionVisitedRes = await response.json() as ISectionVisitedRes

    return data

}



