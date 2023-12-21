import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { RootState, setProfile } from "../store"
import { getUserAPI } from "../API"
import { Navbar } from "../components"


export const HomePage = () => {

    const auth = useSelector((state: RootState) => state.auth)

    const dispatch = useDispatch()

    useEffect(() => {
        getUserAPI(auth.access_token)
            .then(data => {
                dispatch(setProfile({
                    profile: data
                }))
            })
            .catch(err => {
                console.log(err)
            })

    }, [auth, dispatch])


    useEffect(() => {
        document.title = `Home`
    }, [])



    return (
        <>
            <Navbar />

            <Outlet />

        </>
    )
}
