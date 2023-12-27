import { useDispatch, useSelector } from "react-redux";
import { RootState, setIdShoppingCart, setProfile } from "../../store";
import { useEffect } from "react";
import { getShoppingCartByIdUser, getUserAPI } from "../../API";
import { ExceptionNestjs } from "../../API/errors";


export const useHomePage = () => {
    const auth = useSelector((state: RootState) => state.auth)

    const dispatch = useDispatch()

    useEffect(() => {
        document.title = `Home`;
        (async () => {
            try {
                const userAPI = await getUserAPI(auth.access_token)
                dispatch(setProfile({ profile: userAPI }))

                const shoppingCartAPI = await getShoppingCartByIdUser({ idUser: userAPI.id })
                dispatch(setIdShoppingCart({ idShoppingCart: shoppingCartAPI.id }))
            } catch (error) {
                console.error(error)
                if (error instanceof ExceptionNestjs) {
                    if (error.message === 'shopping_cart_not_found') {
                        dispatch(setIdShoppingCart({ idShoppingCart: `` }))
                    }
                }
            }
        })();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



}
