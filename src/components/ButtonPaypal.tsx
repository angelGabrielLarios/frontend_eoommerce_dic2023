import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js"
import { urlAPI } from "../API/url";
import { IProductForPaymentPaypal } from "../hooks";
import { useDispatch, useSelector } from "react-redux";
import { RootState, setIdShoppingCart } from "../store";
import { ICartDetailsRes, changeStatusCompleSC } from "../API";
import { Dispatch, SetStateAction } from "react";

interface Props {
    producstForPaymentPaypal: IProductForPaymentPaypal[],
    setcartProducts: Dispatch<SetStateAction<[] | ICartDetailsRes[]>>

    updatePriceTotal(): void
}

export const ButtonPaypal = ({ producstForPaymentPaypal, setcartProducts, updatePriceTotal }: Props) => {

    const clientId = import.meta.env.VITE_CLIENT_ID

    const auth = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()

    return (
        <>
            <PayPalScriptProvider

                options={{ clientId, currency: 'MXN', }}>


                <PayPalButtons

                    className="rounded-xl"
                    createOrder={
                        async (data, actions) => {
                            try {
                                console.log({ data, actions });
                                const response = await fetch(`${urlAPI}/paypal/create_order`, {
                                    method: "post",
                                    headers: { "Content-Type": "application/json; charset=utf-8" },
                                    body: JSON.stringify({
                                        "intent": "capture",
                                        "products": producstForPaymentPaypal
                                    })
                                });

                                const order = await response.json();
                                return order.id;
                            } catch (error) {
                                console.log(error);
                            }
                        }

                    }
                    onApprove={
                        async (data, actions) => {
                            try {
                                console.log({ data, actions });
                                const order_id = data.orderID;
                                const response = await fetch(`${urlAPI}/paypal/complete_order`, {
                                    method: "post",
                                    headers: { "Content-Type": "application/json; charset=utf-8" },
                                    body: JSON.stringify({
                                        "intent": "capture",
                                        "order_id": order_id
                                    })
                                });

                                const order_details = await response.json();
                                console.log(order_details);
                                const dataAPI = await changeStatusCompleSC({ shoppingCartId: auth.idShoppingCart })
                                console.log(dataAPI)
                                dispatch(setIdShoppingCart({ idShoppingCart: '' }))
                                setcartProducts([])
                                updatePriceTotal()


                            } catch (error) {
                                console.log(error);
                            }
                        }
                    }

                    onCancel={(data, actions) => {
                        console.log({
                            data,
                            actions
                        })
                    }}
                    onError={(err) => {
                        console.log({ err })
                    }}
                    style={{

                        layout: "horizontal",

                        label: 'buynow',
                        shape: "rect",
                        tagline: false

                    }} />


            </PayPalScriptProvider>
        </>
    )
}
