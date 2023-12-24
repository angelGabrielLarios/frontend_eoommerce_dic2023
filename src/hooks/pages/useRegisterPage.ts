import { useEffect, useRef, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { TypesAlerts } from "../../components/types"
import { registerAPI } from "../../API"
import { ExceptionNestjs } from "../../API/errors"
import { useDispatch } from "react-redux"
import { setAccessToken } from "../../store"
import { useNavigate } from "react-router-dom"


interface IFormInputs {
    firstName: string
    lastName: string
    phone: string
    email: string
    password: string
    address: string
}
export const useRegisterPage = () => {


    const { register, reset, handleSubmit, formState: { errors }, control } = useForm<IFormInputs>()

    const [isLoading, setIsLoading] = useState(false)

    const [typeModalRef, settypeModalRef] = useState<TypesAlerts | null>(null)

    const [messageModalRef, setmessageModalRef] = useState(``)

    const modalAlertRef = useRef<HTMLDialogElement>(null)

    const [isShowPassword, setIsShowPassword] = useState(false)

    const dispatch = useDispatch()

    const navigate = useNavigate()


    useEffect(() => {
        document.title = 'Registrarse'
    }, [])

    const onSubmit: SubmitHandler<IFormInputs> = async (data: IFormInputs) => {

        setIsLoading(true)
        try {
            const { access_token } = await registerAPI(
                {
                    firstName: data.firstName.trim(),
                    lastName: data.lastName.trim(),
                    address: data.address.trim(),
                    email: data.email.trim(),
                    password: data.password.trim(),
                    phone: data.phone.trim(),
                }

            )

            dispatch(setAccessToken(access_token))
            navigate('/')
            reset()


        } catch (error) {
            console.error(error)
            settypeModalRef('error')
            if (error instanceof ExceptionNestjs) {
                if (error.message === 'already_email') {
                    setmessageModalRef(`El correo electronico que ingresate ya ha sido registrado`)
                }
                else if (error.message === 'already_phone') {
                    setmessageModalRef(`El numero telefonico que ingresate ya ha sido registrado`)
                }
                else {

                    setmessageModalRef('Algo salio mal, intente de nuevo')
                }
            }
            else {
                setmessageModalRef('Algo salio mal, intente de nuevo')
            }

            modalAlertRef.current?.showModal()

        }
        finally {
            setIsLoading(false)
        }
    }


    return {
        register,
        handleSubmit,
        onSubmit,
        isShowPassword,
        setIsShowPassword,
        isLoading,
        typeModalRef,
        messageModalRef,
        errors,
        modalAlertRef,
        control
    }
}
