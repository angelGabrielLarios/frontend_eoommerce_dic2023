import { useEffect, useState } from "react"
import { ISectionResponse, getSectionsAPI } from "../../API"
import { RootState, setAccessToken, setIdShoppingCart, setProfile } from "../../store"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export const useNavbar = () => {

    const [sections, setSections] = useState<ISectionResponse[] | []>([])
    const { profile } = useSelector((state: RootState) => state.auth)
    const dispath = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        getSectionsAPI()
            .then((sections) => {

                setSections(sections)
            })
            .catch(error => {
                console.error(error)
                return error
            })
    }, [])


    const onClickLogOut = () => {
        dispath(setProfile({ profile: null }))
        dispath(setAccessToken(``))
        dispath(setIdShoppingCart({ idShoppingCart: `` }))

        navigate(`/auth/login`)
    }


    return {
        sections,
        profile,
        onClickLogOut
    }
}
