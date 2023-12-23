import { useEffect, useRef, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { TypesAlerts } from "../../components/types"
import { recoveryPassAPI } from "../../API"
import { ExceptionNestjs } from "../../API/errors"
import { useDispatch } from "react-redux"
import { setEmailRecoveryPass } from "../../store"



interface IFormInputs {
    email: string
}
export const useRecoveryPassPage = () => {

    const { register, reset, handleSubmit, formState: { errors } } = useForm<IFormInputs>()

    const [isLoading, setIsLoading] = useState(false)

    const [typeModalRef, settypeModalRef] = useState<TypesAlerts | null>(null)

    const [messageModalRef, setmessageModalRef] = useState(``)

    const modalAlertRef = useRef<HTMLDialogElement>(null)

    const [isShowPassword, setIsShowPassword] = useState(false)

    const dispath = useDispatch()

    useEffect(() => {
        document.title = 'Enviar correo de recuperación'
    }, [])

    const onSubmit: SubmitHandler<IFormInputs> = async (data: IFormInputs) => {

        setIsLoading(true)
        try {

            const dataAPI = await recoveryPassAPI(data.email)
            console.log(dataAPI)
            dispath(setEmailRecoveryPass(dataAPI.emailRecoveryPass))
            setmessageModalRef(`Ya se envio el correo de recuperacion a este correo ${data.email}`)
            settypeModalRef('success')
            modalAlertRef.current?.showModal()
            reset()

        } catch (error) {
            console.log(error)
            settypeModalRef('error')
            if (error instanceof ExceptionNestjs) {
                if (error.message === 'email_does_not_exist') {
                    setmessageModalRef(`El email de recuperación necesita haberse registrado previamente`)
                }
            }
            else {
                setmessageModalRef(`Algo salio mal`)
            }
            console.log('aqui')

        }
        finally {
            setIsLoading(false)

        }

        modalAlertRef.current?.showModal()
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
