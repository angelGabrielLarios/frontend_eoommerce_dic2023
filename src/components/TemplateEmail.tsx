
import {
    Container,
    Text,
    Tailwind,
    Link,
    Html,
    Head,
    Body,
    Section,
} from "@react-email/components";


interface Props {
    name: string,

}
export function TemplateEmail({ name }: Props) {
    return (
        <>
            <Html>
                <Head />

                <Tailwind>
                    <Body className="bg-base-100 text-base-content my-auto mx-auto font-sans">
                        <Container className="bg-base-300 border border-solid border-primary rounded my-[40px] mx-auto p-[20px] w-[465px]">
                            <Section className="mt-[32px] text-center">

                                <div className="inline-block h-10 w-10 bg-primary rounded-full"></div>
                            </Section>

                            <Text className="text-[14px] leading-[24px] font-bold text-xl mb-2 px-[20px]">
                                Hola {name}
                            </Text>
                            <Text className="text-[14px] leading-[24px] mb-2 px-[20px]">

                                Recibes este mensaje porque solicitaste restablecer tu contraseña para acceder a tu cuenta

                            </Text>
                            <Text className="text-[14px] leading-[24px] mb-4 px-[20px]">

                                Para proceder con el restablecimiento de tu contraseña, haz clic en el siguiente enlace:

                            </Text>
                            <Section className="text-center">

                                <Link
                                    className="inline-block px-4 py-2 bg-primary text-black font-bold mx-auto text-sm"
                                >
                                    Reestablecer tu contraseña
                                </Link>
                            </Section>

                            <Text className="text-[14px] leading-[24px] mb-2 px-[20px]">
                                Si no solicitaste este cambio o no quieres restablecer tu contraseña, puedes ignorar este mensaje con seguridad; tu contraseña actual seguirá siendo válida
                            </Text>

                            <Text className="text-[14px] leading-[24px] mb-2 px-[20px]">
                                Por favor, ten en cuenta que este enlace es válido por un período de tiempo limitado para garantizar la seguridad de tu cuenta.
                            </Text>
                            <Text className="text-[14px] leading-[24px] mb-6 px-[20px]">
                                Si tienes alguna pregunta o necesitas asistencia adicional, no dudes en contactar a nuestro equipo de soporte.
                            </Text>


                        </Container>
                    </Body>
                </Tailwind>
            </Html>

        </>


    );
}


