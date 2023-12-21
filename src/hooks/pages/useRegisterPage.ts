import { useRef, useState } from "react"
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
}
export const useRegisterPage = () => {


    const { register, reset, handleSubmit, formState: { errors } } = useForm<IFormInputs>()

    const [isLoading, setIsLoading] = useState(false)

    const [typeModalRef, settypeModalRef] = useState<TypesAlerts | null>(null)

    const [messageModalRef, setmessageModalRef] = useState(``)

    const modalAlertRef = useRef<HTMLDialogElement>(null)

    const [isShowPassword, setIsShowPassword] = useState(false)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const onSubmit: SubmitHandler<IFormInputs> = async (data: IFormInputs) => {

        setIsLoading(true)
        try {
            const { access_token } = await registerAPI(
                data.firstName,
                data.lastName,
                data.phone,
                data.email,
                data.password
            )

            dispatch(setAccessToken(access_token))
            navigate('/')
            reset()


        } catch (error) {
            if (error instanceof ExceptionNestjs) {
                if (error.message === 'already_email') {
                    setmessageModalRef(`El correo electronico que ingresate ya ha sido registrado`)
                    settypeModalRef('error')
                    modalAlertRef.current?.showModal()

                }
            }
            else {
                console.error(error)
            }

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
        modalAlertRef
    }
}
