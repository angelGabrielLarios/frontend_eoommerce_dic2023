import { NavLink } from "react-router-dom"
import { useNavbar } from "../hooks/components"


export const Navbar = () => {

    const { onClickLogOut, profile, sections } = useNavbar()
    return (
        <>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {
                                sections?.map(section => {
                                    return (
                                        <li
                                            key={section.id}
                                        >
                                            <NavLink
                                                to={`/products/${section.name}`}
                                                className={({ isActive }) => {

                                                    return `${isActive ? 'text-primary font-bold' : ''}`
                                                }}

                                            >
                                                {section.name}
                                            </NavLink>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <NavLink
                        className="btn btn-ghost text-base text-primary font-bold"
                        to={`/`}
                    >
                        MyEcommerce
                    </NavLink>
                </div>
                <div className="navbar-center hidden md:flex">
                    <ul className="menu menu-horizontal px-1">

                        {
                            sections?.map(section => {
                                return (
                                    <li
                                        key={section.id}
                                    >
                                        <NavLink
                                            to={`/products/${section.name}`}
                                            className={({ isActive }) => {

                                                return `${isActive ? 'text-primary font-bold' : ''}`
                                            }}

                                        >
                                            {section.name}
                                        </NavLink>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="navbar-end">
                    <NavLink
                        to={`/cart`}
                    >
                        <button className="btn btn-ghost btn-circle avatar mr-3">
                            <div className="indicator  ">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                            </div>
                        </button>
                    </NavLink>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">

                            <div className="rounded-full flex justify-center items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 256 256"><path fill="currentColor" d="M234.38 210a123.36 123.36 0 0 0-60.78-53.23a76 76 0 1 0-91.2 0A123.36 123.36 0 0 0 21.62 210a12 12 0 1 0 20.77 12c18.12-31.32 50.12-50 85.61-50s67.49 18.69 85.61 50a12 12 0 0 0 20.77-12M76 96a52 52 0 1 1 52 52a52.06 52.06 0 0 1-52-52" /></svg>
                            </div>


                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                <a className="capitalize">
                                    Nombre: {`${profile?.firstName} ${profile?.lastName}`}
                                </a>
                            </li>
                            <li>
                                <NavLink
                                    to={`/sections-visited`}
                                >
                                    Secciones Visitadas
                                </NavLink>
                            </li>
                            <li
                                onClick={onClickLogOut}
                            ><a className="text-error font-bold">Cerrar Sesión</a></li>

                        </ul>
                    </div>
                </div>
            </div >
        </>
    )
}
