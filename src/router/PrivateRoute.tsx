import { useSelector } from "react-redux"
import { RootState } from "../store"
import { Navigate } from "react-router-dom"
import { ReactElement } from "react"


interface Props {
    children: ReactElement
}
export const PrivateRoute = ({ children }: Props) => {
    const auth = useSelector((state: RootState) => state.auth)
    return auth.access_token ? children : <Navigate to={`/auth/login`} />
}
