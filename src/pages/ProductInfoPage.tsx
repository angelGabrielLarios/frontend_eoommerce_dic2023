import { useLoaderData } from "react-router-dom"
import { IProductsReponse } from "../API"
import { CardProductView } from "../components"


export const ProductInfoPage = () => {
    const product: IProductsReponse = useLoaderData() as IProductsReponse
    console.log(product)
    return (
        <>
            <main
                className="min-h-screen flex flex-col justify-center items-center"
            >
                <section className="w-11/12 sm:w-10/12 md:w-7/12 lg:w-[36rem] pt-12">
                    <CardProductView
                        {...product}

                    />
                </section>
            </main>
        </>
    )
}
