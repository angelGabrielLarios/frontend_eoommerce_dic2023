import { useRef, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { TypesAlerts } from "../components/types"
import { ExceptionNestjs } from "../API/errors"
import { useNavigate } from "react-router-dom"
import { restorePasswordAPI } from "../API"


interface IFormInputs {
    password: string
    confirmPassword: string
}
export const useRestorePassPage = () => {

    const { register, reset, handleSubmit, formState: { errors } } = useForm<IFormInputs>()

    const [isLoading, setIsLoading] = useState(false)

    const [typeModalRef, settypeModalRef] = useState<TypesAlerts | null>(null)

    const [messageModalRef, setmessageModalRef] = useState(``)

    const modalAlertRef = useRef<HTMLDialogElement>(null)

    const [isShowPassword, setIsShowPassword] = useState(false)


    const navigate = useNavigate()

    const onSubmit: SubmitHandler<IFormInputs> = async (data: IFormInputs) => {

        setIsLoading(true)
        try {
            const dataAPI = await restorePasswordAPI(data.password)
            console.log(dataAPI)
            reset()
            navigate('/')
        } catch (error) {

            if (error instanceof ExceptionNestjs) {
                if (error.message === 'error_credentials') {
                    setmessageModalRef(`Email o contraseña son incorrectas`)
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
