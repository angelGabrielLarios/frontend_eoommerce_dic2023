
import { ButtonPaypal, CartCardProduct, ConfirmDeleteModal } from "../components"
import { getCartProductsByIdShoppingCartAPI, getTotalCartDetailsByIdSC } from "../API";


import { convertToCurrency } from "../helpers";
import { useCartPage } from "../hooks";
import { LoadingComponent } from "../components/LoadingComponent";

export const CartPage = () => {

    const { cartProducts,
        setcartProducts,
        modalConfirmDeleteRef,
        onClickConfirmDelete,
        setOnClickConfirmDelete,
        totalFinalState,
        setTotalFinalState,
        idShoppingCart,
        isLoading,
        producstForPaymentPaypal
    } = useCartPage()

    return (
        <>

            {
                isLoading
                    ?
                    <section
                        className="bg-base-300 flex flex-col justify-center items-center min-h-screen"
                    >
                        <LoadingComponent
                            show={true}
                            size="loading-lg"
                        />
                    </section>
                    :
                    <>

                        <section className="h-screen bg-base-100 pt-10 ">
                            <h1
                                className="text-primary font-bold text-xl md:text-2xl lg:text-3xl mb-6 text-center font-header"
                            >
                                Tu carrito
                            </h1>
                            <article className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                                <section className="rounded-lg md:w-2/3">

                                    {
                                        cartProducts.length === 0
                                            ? <article className="bg-base-300 text-base-content text-xs sm:text-sm h-[10rem] flex flex-col items-center justify-center font-bold rounded-lg">
                                                No tienes productos guardados en el carrito, visita la tienda para ver que te podría gustar
                                            </article>
                                            : null
                                    }

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
                                                            console.log(dataAPI)
                                                            setTotalFinalState(dataAPI.total)
                                                        }
                                                    }
                                                />
                                            )
                                        })
                                    }

                                </section>

                                <div className="mt-6 h-full rounded-lg border border-primary bg-base-300 p-6 shadow-md md:mt-0 md:w-1/3 text-base-content">
                                    <div className="mb-2 flex justify-between text-xs sm:text-sm">
                                        <p className="">Producto(s):</p>
                                        <p className="">{cartProducts.length}</p>
                                    </div>

                                    <hr className="my-4" />
                                    <article className="flex justify-between">
                                        <p className="text-xs sm:text-sm font-bold">Total</p>
                                        <div className="">
                                            <p className="mb-1 text-xs sm:text-sm font-bold">{
                                                convertToCurrency({ amount: totalFinalState, currencyCode: 'MXN', locales: 'es-MX' })
                                            }</p>

                                        </div>
                                    </article>



                                    {
                                        (cartProducts.length !== 0)
                                            ?
                                            <div className="bg-primary">
                                                <ButtonPaypal
                                                    setcartProducts={setcartProducts}
                                                    producstForPaymentPaypal={producstForPaymentPaypal}
                                                    updatePriceTotal={() => {

                                                        setTotalFinalState(0)
                                                    }}
                                                />

                                            </div>
                                            : null
                                    }
                                </div>
                            </article>
                        </section>

                        <ConfirmDeleteModal
                            modalConfirmDeleteRef={modalConfirmDeleteRef}
                            text="¿Esta seguro de eliminar el producto del carrito?"
                            onClickConfirmDelete={onClickConfirmDelete}
                        />
                    </>
            }
        </>
    )
}
