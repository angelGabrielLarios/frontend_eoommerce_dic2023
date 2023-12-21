
import { Link } from "react-router-dom"
import { ModalAlert } from "../components"
import { useLoginPage } from "../hooks/pages"

export const LoginPage = () => {

    const { errors, handleSubmit, isLoading, isShowPassword, messageModalRef, onSubmit, register, setIsShowPassword, typeModalRef, modalAlertRef } = useLoginPage()

    console.log(errors)
    return (
        <>
            <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-base-200 to-primary">
                <form
                    className="p-6 shadow-lg shadow-base-200 rounded-md bg-base-200 w-11/12 md:w-8/12 lg:w-[40rem]"
                    onSubmit={handleSubmit(onSubmit)}
                    autoComplete="off"
                >
                    <h1
                        className="text-primary font-bold text-4xl mb-6 text-center font-header"
                    >
                        Iniciar sesion
                    </h1>

                    <div className="space-y-4">
                        <input
                            disabled={isLoading}
                            type="email"
                            placeholder="Correo Electrónico:"
                            className={
                                `input input-bordered w-full bg-inherit text-xs lg:text-sm placeholder:text-xs placeholder:lg:text-sm ${errors?.email ? 'input-error' : ''}`
                            }
                            {...register('email', {
                                required: {
                                    value: true,
                                    message: 'Este campo es obligatorio'
                                }
                            })} />

                        {
                            errors?.email?.type === 'required'
                                ?
                                <p
                                    className="text-error text-xs flex items-center gap-2 justify-end"
                                >
                                    {errors?.email?.message} <svg className="stroke-error" width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 16H12.01M12 8V12M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                                </p>
                                : null
                        }

                        <input
                            disabled={isLoading}
                            type={isShowPassword ? 'text' : 'password'}
                            placeholder="Contraseña"
                            className={
                                `input input-bordered w-full bg-inherit text-xs lg:text-sm placeholder:text-xs placeholder:lg:text-sm ${errors?.password ? 'input-error' : ''}`
                            }
                            {...register('password', {
                                required: {
                                    value: true,
                                    message: 'Este campo es obligatorio'
                                }
                            })} />

                        {
                            errors?.password?.type === 'required'
                                ?
                                <p
                                    className="text-error text-xs flex items-center gap-2 justify-end"
                                >
                                    {errors?.password?.message} <svg className="stroke-error" width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 16H12.01M12 8V12M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                                </p>
                                : null
                        }

                        <label className="cursor-pointer label">
                            <span className="label-text text-sm">Mostar contraseña</span>
                            <input
                                type="checkbox"
                                className="toggle toggle-primary"
                                onChange={(event) => setIsShowPassword(event.target.checked)}

                            />
                        </label>


                        <button
                            disabled={isLoading}
                            type="submit"
                            className="btn btn-primary w-full">
                            Iniciar Sesión
                            {isLoading ? <span className="loading loading-dots loading-xs"></span> : null}

                        </button>

                        <p
                            className="text-center text-sm"
                        >
                            ¿No tiene una cuenta?
                            <Link
                                to={'/auth/register'}
                                className="text-primary ml-1 font-bold"
                            >
                                Registrarse
                            </Link>
                        </p>

                        <p
                            className="text-center text-sm"
                        >
                            ¿No te acuerdas de tu contraseña?
                            <Link
                                to={'/auth/recovery-password'}
                                className="text-primary ml-1 font-bold"
                            >
                                Recuperar contraseña
                            </Link>
                        </p>
                    </div>
                </form>

                <ModalAlert
                    modalRef={modalAlertRef}
                    message={messageModalRef}
                    type={typeModalRef}
                />
            </main>
        </>
    )
}
