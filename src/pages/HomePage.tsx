import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../store"
import { getUserAPI } from "../API"
import { Carousel, Navbar } from "../components"


export const HomePage = () => {



    const auth = useSelector((state: RootState) => state.auth)


    useEffect(() => {
        getUserAPI(auth.access_token)
            .then(data => {
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })

    }, [auth])


    useEffect(() => {
        /* getProductsAPI()
            .then(newProducts => {
                setProducts(newProducts)
            })
            .catch(err => {
                console.error(err)
            }) */




    }, [])



    return (
        <>
            <Navbar />

            <Outlet />

        </>
    )
}
