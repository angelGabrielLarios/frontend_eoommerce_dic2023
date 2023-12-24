import { NavLink } from "react-router-dom"


export const ErrorInvalidTokenPage = () => {
    return (
        <>
            <main className="min-h-screen flex flex-col items-center justify-start md:justify-center">
                <section className="p-4 rounded-lg border border-error mt-12 md:mt-0 w-11/12 md:w-[600px] space-y-4 text-center">
                    <h1 className="text-lg md:text-2xl text-error font-bold ">
                        Token de Recuperación No valido
                    </h1>
                    <p className="text-xs sm:text-sm">
                        Verfica en enlace para reestablecer la contraseña porque el token no es valido, sino vuelve enviar un correo de recuperación
                    </p>

                    <NavLink
                        to={'/auth/recovery-password'}
                        className={'text-primary ml-1 font-bold text-xs md:text-sm'}
                    >
                        Recuperar contraseña
                    </NavLink>
                </section>
            </main>
        </>
    )
}
