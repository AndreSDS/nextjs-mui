import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('America/Sao_Paulo');

export function formatISODateToUTC(date: string | Date) {
    return dayjs(date).format()
}

export function formatDateToString(date: string | Date) {
    const newDate = new Date(date)

    const formatedDate = Intl.DateTimeFormat('pt-BR', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    }).format(newDate)

    return formatedDate;
}
