import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { useEffect, useRef, useState } from "react"
import { ICartDetailsRes, getCartProductsByIdShoppingCartAPI, getTotalCartDetailsByIdSC } from "../../API"

export const useCartPage = () => {
    const { idShoppingCart } = useSelector((state: RootState) => state.auth)


    const [cartProducts, setcartProducts] = useState<ICartDetailsRes[] | []>([])

    const [totalFinalState, setTotalFinalState] = useState<number>(0)


    const [isLoading, setisLoading] = useState<boolean>(false)

    useEffect(() => {
        document.title = `Carrito de compras`;


        (async () => {
            setisLoading(true)
            const cartProducts = await getCartProductsByIdShoppingCartAPI({ idShoppingCart })
            setcartProducts(cartProducts)
            setisLoading(false)
        })();


        (async () => {
            const dataAPI = await getTotalCartDetailsByIdSC({ idShoppingCart })
            setTotalFinalState(dataAPI.total)
        })();
    }, [idShoppingCart])

    const modalConfirmDeleteRef = useRef<HTMLDialogElement | null>(null)

    const [onClickConfirmDelete, setOnClickConfirmDelete] = useState<() => void>(() => { })

    return {
        cartProducts,
        setcartProducts,
        modalConfirmDeleteRef,
        onClickConfirmDelete,
        setOnClickConfirmDelete,
        totalFinalState,
        setTotalFinalState,
        idShoppingCart,
        isLoading

    }
}
