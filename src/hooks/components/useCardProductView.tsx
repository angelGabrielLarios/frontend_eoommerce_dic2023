
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addProductToCart } from "../../API"
import { RootState, setIdShoppingCart } from "../../store"
import toast from "react-hot-toast"
import { ToastComponent } from "../../components"


export const useCardProductView = () => {

    const [isLoading, setIsLoading] = useState(false)

    const { profile } = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()


    const onClickAddToCart = async ({ idUser, idProduct }: { idUser: string, idProduct: string }) => {
        try {
            setIsLoading(true)
            const dataAPI = await addProductToCart({ idUser, idProduct })
            dispatch(setIdShoppingCart({ idShoppingCart: dataAPI.shoppingCart.id }))

            toast(
                (t) => (
                    <>

                        <ToastComponent
                            t={t}
                            text='Se agrego el producto al carrito correctamente'
                        />
                    </>

                )
            );
        } catch (error) {
            console.error(error)
        }
        finally {
            setIsLoading(false)
        }
    }


    return {
        isLoading,
        profile,
        onClickAddToCart
    }
}
