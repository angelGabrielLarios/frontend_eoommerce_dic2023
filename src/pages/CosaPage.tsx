import { render } from "@react-email/render"
import { TemplateEmail } from "../components"


export const CosaPage = () => {
    const html = render(<TemplateEmail name="angel" />, {
        pretty: true
    })

    console.log(html)
    return (
        <>
            hola
        </>
    )
}
