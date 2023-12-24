import { useEffect, useState } from "react"
import { RootState } from "../../store"
import { useSelector } from "react-redux"
import { IProductsReponse, getSubtotalByProduct } from "../../API"
import { updateCartDetailsQuantityAPI } from "../../API/updateCartDetailsQuantityAPI"

export const useCartCardProduct = ({ quantityInitialState = 0, product, updateFinalCartDetails }: { quantityInitialState: number, product: IProductsReponse, updateFinalCartDetails: () => void }) => {
    const [quantityState, setQuantityState] = useState<number>(quantityInitialState)

    const { idShoppingCart } = useSelector((state: RootState) => state.auth)

    const [subTotalByProduct, setSubTotalByProduct] = useState(0)


    useEffect(() => {


        (async () => {
            const dataAPI = await getSubtotalByProduct({ idProduct: product.id, idShoppingCart })
            setSubTotalByProduct(dataAPI.subtotal_by_product)
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quantityState])


    const onClickUpdateQuantity = async ({ quantity, idCartDetails }: { quantity: number, idCartDetails: string }) => {
        try {
            const dataAPI = await updateCartDetailsQuantityAPI({ idCartDetails, quantity })
            setQuantityState(dataAPI.quantity)
            updateFinalCartDetails()

        } catch (error) {
            console.error(error)
        }
    }


    return {
        onClickUpdateQuantity,
        subTotalByProduct,
        quantityState
    }



}
