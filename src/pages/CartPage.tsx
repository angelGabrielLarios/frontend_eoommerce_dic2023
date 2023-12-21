import { useEffect } from "react"
import { CartCardProduct } from "../components"

export const CartPage = () => {

    useEffect(() => {
        document.title = `Carrito de compras`
    }, [])
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
                        <CartCardProduct
                            name="WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive"
                            amount={50}
                            description="angel"
                            id="sd"
                            imageURL="asd"

                            price={10}
                            section={{ name: 'hola' }}


                        />
                        <CartCardProduct
                            name="WD 2TB Elements Portable External Hard Drive - USB 3.0"
                            amount={50}
                            description="angel"
                            id="sd"
                            imageURL="asd"

                            price={10}
                            section={{ name: 'hola' }}


                        />

                    </div>
                    {/* Sub total */}
                    <div className="mt-6 h-full rounded-lg border border-primary bg-base-300 p-6 shadow-md md:mt-0 md:w-1/3 text-base-content">
                        <div className="mb-2 flex justify-between">
                            <p className="">Subtotal</p>
                            <p className="">$129.99</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="">Shipping</p>
                            <p className="">$4.99</p>
                        </div>
                        <hr className="my-4" />
                        <div className="flex justify-between">
                            <p className="text-lg font-bold">Total</p>
                            <div className="">
                                <p className="mb-1 text-lg font-bold">$134.98 USD</p>

                            </div>
                        </div>
                        <button className="btn btn-secondary w-full">
                            Pagar
                        </button>
                    </div>
                </div>
            </div>

        </>
    )
}
