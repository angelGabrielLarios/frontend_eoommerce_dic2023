import { useEffect, useRef, useState } from "react"
import { CartCardProduct, ConfirmDeleteModal } from "../components"
import { ICartDetailsRes, getCartProductsByIdShoppingCartAPI, getTotalCartDetailsByIdSC } from "../API";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { convertToCurrency } from "../helpers";

export const CartPage = () => {


    const { idShoppingCart } = useSelector((state: RootState) => state.auth)


    const [cartProducts, setcartProducts] = useState<ICartDetailsRes[] | []>([])

    const [totalFinalState, setTotalFinalState] = useState<number>(0)

    useEffect(() => {
        document.title = `Carrito de compras`;


        (async () => {
            const cartProducts = await getCartProductsByIdShoppingCartAPI({ idShoppingCart })
            setcartProducts(cartProducts)
        })();


        (async () => {
            const dataAPI = await getTotalCartDetailsByIdSC({ idShoppingCart })
            setTotalFinalState(dataAPI.total)
        })();
    }, [idShoppingCart])

    const modalConfirmDeleteRef = useRef<HTMLDialogElement | null>(null)

    const [onClickConfirmDelete, setOnClickConfirmDelete] = useState<() => void>(() => { console.log('inicial') })

    return (
        <>
            <div className="h-screen bg-base-100 pt-10">
                <h1
                    className="text-primary font-bold text-4xl mb-6 text-center font-header"
                >
                    Tu carrito
                </h1>
                <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                    <div className="rounded-lg md:w-2/3">
                        {
                            cartProducts?.map(cartProduct => {
                                const { product, id, quantity } = cartProduct
                                return (

                                    <CartCardProduct
                                        key={id}
                                        product={product}
                                        id={id}
                                        quantity={quantity}
                                        setOnClickConfirmDelete={setOnClickConfirmDelete}
                                        updateCartProducts={async () => {
                                            const cartProducts = await getCartProductsByIdShoppingCartAPI({ idShoppingCart })
                                            setcartProducts(cartProducts)
                                        }}
                                        modalConfirmDeleteRef={modalConfirmDeleteRef}
                                        updateFinalCartDetails={
                                            async () => {
                                                const dataAPI = await getTotalCartDetailsByIdSC({ idShoppingCart })
                                                setTotalFinalState(dataAPI.total)
                                            }
                                        }
                                    />
                                )
                            })
                        }

                    </div>
                    {/* Sub total */}
                    <div className="mt-6 h-full rounded-lg border border-primary bg-base-300 p-6 shadow-md md:mt-0 md:w-1/3 text-base-content">
                        <div className="mb-2 flex justify-between">
                            <p className="">Producto(s):</p>
                            <p className="">{cartProducts.length}</p>
                        </div>

                        <hr className="my-4" />
                        <div className="flex justify-between">
                            <p className="text-lg font-bold">Total</p>
                            <div className="">
                                <p className="mb-1 text-lg font-bold">{
                                    convertToCurrency({ amount: totalFinalState, currencyCode: 'MXN', locales: 'es-MX' })
                                }</p>

                            </div>
                        </div>
                        <button className="btn btn-secondary w-full">
                            Pagar
                        </button>
                    </div>
                </div>
            </div>

            <ConfirmDeleteModal
                modalConfirmDeleteRef={modalConfirmDeleteRef}
                text="¿Esta seguro de eliminar el producto del carrito?"
                onClickConfirmDelete={onClickConfirmDelete}
            />
        </>
    )
}
