import { IProductsReponse } from "../API"
import { convertToCurrency } from "../helpers"


interface Props extends IProductsReponse { }

export const CartCardProduct = ({ name, price, section }: Props) => {
    return (
        <>
            <section>
                <div className="justify-between mb-6 rounded-lg bg-base-300 p-4 shadow-md sm:flex sm:justify-start">
                    <img
                        src="https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg"
                        alt="product-image"
                        className="w-full rounded-lg sm:w-40 h-20 object-cover"
                    />
                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                        <div className="mt-5 sm:mt-0 space-y-4">
                            <h2 className="text-base font-bold text-primary ">
                                {name}
                            </h2>
                            <p className="badge badge-primary badge-outline">{section.name}</p>
                        </div>
                        <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                            <div className="flex items-stretch border-gray-100">
                                <button className="btn btn-sm rounded-none rounded-l-lg btn-primary ">+</button>
                                <input
                                    className="input input-sm rounded-none w-16 h-auto"
                                    type="number"
                                    defaultValue={1}
                                    min={1}
                                />
                                <button className="btn btn-sm rounded-none rounded-r-lg btn-primary ">-</button>
                            </div>
                            <div className="flex items-center space-x-4">
                                <p className="text-sm text-base-content">{convertToCurrency({ amount: price, locales: 'es-MX', currencyCode: 'MXN' })}</p>
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
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
