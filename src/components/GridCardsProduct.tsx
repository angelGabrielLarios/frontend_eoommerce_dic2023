import { useLoaderData, useParams } from "react-router-dom"
import { IProductsReponse, registerSectionVisited } from "../API"
import { CardProduct } from "."
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../store"


export const GridCardsProduct = () => {


    const { products, idSection } = useLoaderData() as { products: IProductsReponse[], idSection: string }

    const auth = useSelector((state: RootState) => state.auth)

    const params = useParams()

    useEffect(() => {
        (async () => {
            if (params?.section) {
                const dataAPI = await registerSectionVisited({ userId: auth.profile?.id || ``, sectionId: idSection })
                console.log(dataAPI)
            }

        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [products])


    return (
        <>
            <section
                className="px-4 sm:px-8 md:px-10 lg:px-12 grid items-start grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 
                gap-4"
            >
                {
                    products?.map(product => {
                        return (
                            <CardProduct
                                key={product.id}
                                {...product}

                            />
                        )
                    })
                }
            </section>
        </>
    )
}
