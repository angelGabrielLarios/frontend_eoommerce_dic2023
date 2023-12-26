

export const formatDate = ({ date }: { date: string }) => {

    const objDate = new Date(date)

    return `${objDate.toLocaleDateString()} - ${objDate.toLocaleTimeString()}`
}
