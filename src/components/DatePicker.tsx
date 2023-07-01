import { formatDate } from '@/utils/formatDate'
import {
  DatePicker,
  LocalizationProvider,
  MobileTimePicker,
} from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo'
import dayjs from 'dayjs'

type Props = {
  onChange: (value: any) => void
  isHour?: boolean
  label?: string
  value?: string
}

export function DatePickerComponent({
  onChange,
  isHour = false,
  label,
  value,
}: Props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        sx={{ paddingTop: `${isHour ? '0' : '8px'}` }}
        components={['DatePicker', 'MobileTimePicker']}
      >
        <DemoItem>
          {isHour ? (
            <MobileTimePicker
              onChange={(value) => onChange(value)}
              defaultValue={value ? dayjs(value) : dayjs()}
            />
          ) : (
            <DatePicker
              format="DD/MM/YYYY"
              defaultValue={value ? formatDate(value) : dayjs()}
              label={label}
              onChange={(value) => {
                onChange(dayjs(value).format())
              }}
            />
          )}
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  )
}

{
  catergoriaHabilitacao: 'A'
  nome: 'João'
  numeroHabilitacao: '987987987'
  vencimentoHabilitacao: '2023-07-02T17:39:12.000Z'
}
