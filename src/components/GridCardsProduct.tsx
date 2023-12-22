import { useLoaderData } from "react-router-dom"
import { IProductsReponse } from "../API"
import { CardProduct } from "."


export const GridCardsProduct = () => {

    const products: IProductsReponse[] = useLoaderData() as IProductsReponse[]

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
