import { addProductToCart } from "../../API"


export const useAddProductToCart = () => {
    const onClickAddProductToCart = async ({ idProduct, idUser }: { idProduct: string, idUser: string }) => {
        try {
            const dataAPI = await addProductToCart({
                idProduct,
                idUser
            })

            console.log(dataAPI)

        } catch (error) {
            console.error(error)
        }
    }

    return {
        onClickAddProductToCart
    }
}
