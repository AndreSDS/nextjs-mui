export function formatDateHour(date: string | Date) {
    const dateObj = new Date(date)

    return new Intl.DateTimeFormat('pt-BR', {
        hour: 'numeric',
        minute: "numeric",
        hour12: true
    }).format(dateObj)
}