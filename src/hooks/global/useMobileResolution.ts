import { useEffect, useState } from "react";


export const useMobileResolution = (): { isMobile: boolean } => {
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        const handleResize = () => {
            const isWindowMobile = window.innerWidth < 640; // Define el ancho de pantalla para móviles
            setIsMobile(isWindowMobile);
        };

        // Llama a handleResize inicialmente y agrega el listener para cambios de tamaño
        handleResize();
        window.addEventListener('resize', handleResize);

        // Limpia el event listener cuando el componente se desmonta
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return {
        isMobile
    }
}

