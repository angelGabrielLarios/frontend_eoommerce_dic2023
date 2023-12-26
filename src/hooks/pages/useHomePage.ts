import { useDispatch, useSelector } from "react-redux";
import { RootState, setIdShoppingCart, setProfile } from "../../store";
import { useEffect } from "react";
import { getShoppingCartByIdUser, getUserAPI } from "../../API";


export const useHomePage = () => {
    const auth = useSelector((state: RootState) => state.auth)

    const dispatch = useDispatch()

    useEffect(() => {
        document.title = `Home`;
        (async () => {
            const userAPI = await getUserAPI(auth.access_token)
            dispatch(setProfile({ profile: userAPI }))
            const shoppingCartAPI = await getShoppingCartByIdUser({ idUser: userAPI.id })
            dispatch(setIdShoppingCart({ idShoppingCart: shoppingCartAPI.id }))
        })();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



}
