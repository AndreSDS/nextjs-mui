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
}

export function DatePickerComponent({
  onChange,
  isHour = false,
  label,
}: Props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'MobileTimePicker']}>
        <DemoItem>
          {isHour ? (
            <MobileTimePicker
              onChange={(value) => onChange(value)}
              defaultValue={dayjs()}
            />
          ) : (
            <DatePicker
              format="DD/MM/YYYY"
              defaultValue={dayjs()}
              label={label}
              onChange={(value) => {
                onChange(dayjs(value).format())}}
            />
          )}
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  )
}
