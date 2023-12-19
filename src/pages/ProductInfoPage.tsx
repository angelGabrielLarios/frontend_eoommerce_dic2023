import { useLoaderData } from "react-router-dom"
import { IProductsReponse } from "../API"


export const ProductInfoPage = () => {
    const product: IProductsReponse = useLoaderData() as IProductsReponse
    console.log(product)
    return (
        <>
            <div>ProductInfoPage</div>
        </>
    )
}
