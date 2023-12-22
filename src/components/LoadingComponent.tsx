


interface Props {
    show: boolean
    size: 'loading-xs' | 'loading-sm' | 'loading-md' | 'loading-lg'
}
export const LoadingComponent = ({ show, size }: Props) => {
    return (
        <>
            {
                show
                    ? <span className={`loading loading-bars ${size}`}></span>
                    : null
            }
        </>
    )
}
