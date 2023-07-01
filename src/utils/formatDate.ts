import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('America/Sao_Paulo');

export function formatDate(date: string | Date) {
    return dayjs(date).format('DD/MM/YY')
}

export function transformToISO(date: string | Date) {
    return dayjs(date).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
}

export function extractHour(date: string | Date) {
    return dayjs(date).format('HH:mm A')
}
