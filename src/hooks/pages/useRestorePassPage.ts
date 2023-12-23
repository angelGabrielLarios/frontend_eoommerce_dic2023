import { useEffect, useRef, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { TypesAlerts } from "../../components/types"
import { ExceptionNestjs } from "../../API/errors"
import { useNavigate } from "react-router-dom"
import { getIsValidateTokenAPI, restorePasswordAPI } from "../../API"
import { useDispatch, useSelector } from "react-redux"
import { RootState, setEmailRecoveryPass } from "../../store"


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

    const { emailRecoveryPass } = useSelector((state: RootState) => state.auth)

    const dispatch = useDispatch()

    const tokenRef = useRef<string>(``)

    useEffect(() => {

        document.title = `Restablecer contraseña`

        const urlCurrectly = new URL(location.href)
        const params = new URLSearchParams(urlCurrectly.search);

        tokenRef.current = params.get('token') || ``;

        console.log(tokenRef.current);


        (async () => {
            const dataAPI = await getIsValidateTokenAPI({ token: tokenRef.current })
            console.log(dataAPI)
            if (!dataAPI.isValidateToken) {
                navigate('/auth/error-invalid-token')
                return
            }
        })();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onSubmit: SubmitHandler<IFormInputs> = async (data: IFormInputs) => {

        if (data.password !== data.confirmPassword) {
            settypeModalRef(`error`)
            setmessageModalRef(`Las contraseñas no coinciden`)
            modalAlertRef.current?.showModal()
            return
        }
        setIsLoading(true)
        console.log(tokenRef.current)
        try {
            const dataAPI = await restorePasswordAPI({
                email: emailRecoveryPass,
                newPassword: data.password,
                token: tokenRef.current
            })
            console.log(dataAPI)
            reset()
            dispatch(setEmailRecoveryPass(``))
            navigate('/auth/login')
        } catch (error) {
            console.error(error)
            if (error instanceof ExceptionNestjs) {
                if (error.message === 'invalidate_token') {
                    setmessageModalRef(`El token que ingreso no es el correcto vuelta a intentar a enviar el correo de recuperacion`)
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
