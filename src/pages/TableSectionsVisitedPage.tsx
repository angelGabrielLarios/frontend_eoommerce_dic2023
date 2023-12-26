import { useSelector } from "react-redux"
import { RootState } from "../store"
import { useEffect, useState } from "react"
import { ISectionVisitedByUserRes, getSectonsVisitedByUserId } from "../API"
import { formatDate } from "../helpers"


export const TableSectionsVisitedPage = () => {
    const auth = useSelector((state: RootState) => state.auth)

    const [sectionsVisited, setsectionsVisited] = useState<ISectionVisitedByUserRes[] | []>([])

    useEffect(() => {
        (async () => {
            const newSectionsVisited = await getSectonsVisitedByUserId({ userId: auth.profile?.id || `` })
            setsectionsVisited(newSectionsVisited)

        })();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>

            <main className="min-h-screen flex flex-col justify-start items-center">
                <h1
                    className="text-primary font-bold text-xl sm:text-2xl md:3xl lg:text-4xl mb-6 text-center font-header mt-10 "
                >
                    Secciones Visitadas
                </h1>


                <div className="w-11/12 md:w-[600px] overflow-auto h-[75vh]">
                    <table className="w-full bg-base-300 shadow-md rounded-xl ">
                        <thead>
                            <tr className="bg-blue-gray-100 ">
                                <th className="py-3 px-4 text-left text-primary font-bold text-xs sm:text-sm">Sección </th>
                                <th className="py-3 px-4 text-left text-primary font-bold text-xs sm:text-sm">Fecha Visitada</th>

                            </tr>
                        </thead>
                        <tbody className="text-base-content">


                            {
                                sectionsVisited.map((sectionsVisited) => {
                                    return (
                                        <tr className="" key={sectionsVisited.id}>
                                            <td className="bg-base-200 py-3 px-4 text-base-content font-bold text-xs sm:text-sm">{sectionsVisited.section.name}</td>
                                            <td className="bg-base-200 py-3 px-4 text-base-content font-bold text-xs sm:text-sm">
                                                {formatDate({ date: sectionsVisited.createdDate })}
                                            </td>

                                        </tr>
                                    )
                                })
                            }



                        </tbody>
                    </table>

                </div>


            </main>
        </>
    )
}
