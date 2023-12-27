import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { useEffect, useRef, useState } from "react"
import { ICartDetailsRes, getCartProductsByIdShoppingCartAPI, getTotalCartDetailsByIdSC } from "../../API"


export interface IProductForPaymentPaypal {
    name: string
    description: string
    price: number
    quantity: number
}

export const useCartPage = () => {
    const { idShoppingCart } = useSelector((state: RootState) => state.auth)


    const [cartProducts, setcartProducts] = useState<ICartDetailsRes[] | []>([])

    const [totalFinalState, setTotalFinalState] = useState<number>(0)


    const [isLoading, setisLoading] = useState<boolean>(false)


    const [producstForPaymentPaypal, setProductsForPaymentPaypal] = useState<IProductForPaymentPaypal[] | []>([])

    useEffect(() => {
        document.title = `Carrito de compras`;


        (async () => {
            setisLoading(true)

            try {
                const cartProducts = await getCartProductsByIdShoppingCartAPI({ idShoppingCart })


                setProductsForPaymentPaypal(
                    cartProducts.map(product => {
                        return {
                            name: product.product.name,
                            description: product.product.description,
                            price: product.product.price,
                            quantity: product.quantity
                        }
                    })
                )


                setcartProducts(cartProducts)

            } catch (error) {
                console.error(error)
                setcartProducts([])
                setProductsForPaymentPaypal([])
            }
            finally {
                setisLoading(false)
            }


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
        isLoading,
        producstForPaymentPaypal

    }
}
