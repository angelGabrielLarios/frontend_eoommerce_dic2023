import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js"
import { urlAPI } from "../API/url";
import { IProductForPaymentPaypal } from "../hooks";


export const ButtonPaypal = ({ producstForPaymentPaypal }: { producstForPaymentPaypal: IProductForPaymentPaypal[] }) => {

    const clientId = import.meta.env.VITE_CLIENT_ID



    return (
        <>
            <PayPalScriptProvider

                options={{ clientId, currency: 'MXN', }}>


                <PayPalButtons

                    className="rounded-xl"
                    createOrder={
                        (data, actions) => {
                            console.log({ data, actions })
                            return fetch(`${urlAPI}/paypal/create_order`, {
                                method: "post", headers: { "Content-Type": "application/json; charset=utf-8" },
                                body: JSON.stringify(
                                    {
                                        "intent": "capture",
                                        "products": producstForPaymentPaypal
                                    }
                                )
                            })
                                .then((response) => response.json())
                                .then((order) => { return order.id; });
                        }
                    }
                    onApprove={
                        (data, actions) => {
                            console.log({ data, actions })
                            const order_id = data.orderID;
                            return fetch(`${urlAPI}/paypal/complete_order`, {
                                method: "post", headers: { "Content-Type": "application/json; charset=utf-8" },
                                body: JSON.stringify({
                                    "intent": "capture",
                                    "order_id": order_id
                                })
                            })
                                .then((response) => response.json())
                                .then((order_details) => {
                                    console.log(order_details); //https://developer.paypal.com/docs/api/orders/v2/#orders_capture!c=201&path=create_time&t=response

                                })
                                .catch((error) => {
                                    console.log(error);

                                });
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
