
import { Outlet } from "react-router-dom"
import { Navbar } from "../components"
import { useHomePage } from "../hooks"


export const HomePage = () => {

    useHomePage()



    return (
        <>
            <Navbar />

            <Outlet />

        </>
    )
}
