import { useSelector } from "react-redux"
import { IProductsReponse, deleteOneCartDetailsAPI, getSubtotalByProduct } from "../API"
import { convertToCurrency } from "../helpers"
import { RootState } from "../store"
import { Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from "react"
import { updateCartDetailsQuantityAPI } from "../API/updateCartDetailsQuantityAPI"



interface Propss {
    product: IProductsReponse,
    id: string
    quantity: number
    setOnClickConfirmDelete: Dispatch<SetStateAction<() => void>>
    updateCartProducts(): void
    modalConfirmDeleteRef: MutableRefObject<HTMLDialogElement | null>
    updateFinalCartDetails(): void
}

export const CartCardProduct = ({ product, id, quantity, setOnClickConfirmDelete, updateCartProducts, modalConfirmDeleteRef, updateFinalCartDetails }: Propss) => {

    const [quantityState, setQuantityState] = useState<number>(quantity)

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


    return (
        <>
            <section>
                <div className="justify-between mb-6 rounded-lg bg-base-300 p-4 shadow-md sm:flex sm:justify-start">
                    <img
                        src={product.imageURL}
                        alt="product-image"
                        className="w-full rounded-lg sm:w-40 h-20 object-cover"
                    />
                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                        <div className="mt-5 sm:mt-0 space-y-4">
                            <h2 className="text-base font-bold text-primary ">
                                {product.name}
                            </h2>
                            <p className="badge badge-primary badge-outline">{product.section.name}</p>
                        </div>
                        <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                            <div className="flex items-stretch border-gray-100">
                                <button
                                    className="btn btn-sm rounded-none rounded-l-lg btn-primary "
                                    onClick={() => {
                                        onClickUpdateQuantity({ idCartDetails: id, quantity: quantityState !== 1 ? quantityState - 1 : quantityState })

                                    }}
                                >-</button>
                                <input
                                    className="input input-sm rounded-none w-16 h-auto"
                                    type="number"
                                    value={quantityState}
                                    min={1}
                                    onChange={() => { }}
                                />


                                <button
                                    className="btn btn-sm rounded-none rounded-r-lg btn-primary"
                                    onClick={() => {
                                        onClickUpdateQuantity({ idCartDetails: id, quantity: quantityState + 1 })

                                    }}
                                >+</button>
                            </div>
                            <div className="flex items-center space-x-4">
                                <p className="text-sm text-base-content">{convertToCurrency({ amount: subTotalByProduct, locales: 'es-MX', currencyCode: 'MXN' })}</p>
                                <button onClick={() => {

                                    setOnClickConfirmDelete(() => async () => {
                                        try {
                                            await deleteOneCartDetailsAPI({ id })
                                            updateCartProducts()
                                            updateFinalCartDetails()

                                        } catch (error) {
                                            console.error(error)
                                        }
                                    })

                                    modalConfirmDeleteRef.current?.showModal()
                                }}>
                                    <svg

                                        xmlns="http://www.w3.org/2000/svg"

                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="h-5 w-5 cursor-pointer duration-150  hover:text-error"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </>
    )
}
