
interface Props {
    amount: number,
    locales: Intl.LocalesArgument
    currencyCode: string
}
export const convertToCurrency = ({ amount, locales, currencyCode }: Props) => {
    try {
        // Convertir el número a formato de la moneda especificada
        const amountInCurrency = amount.toLocaleString(locales, {
            style: "currency",
            currency: currencyCode
        });

        return amountInCurrency;
    } catch (error) {
        throw new Error(``)
    }
}